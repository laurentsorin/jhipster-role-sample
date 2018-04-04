package fr.ippon.sample.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.ippon.sample.domain.Authority;
import fr.ippon.sample.repository.AuthorityRepository;
import fr.ippon.sample.web.rest.errors.BadRequestAlertException;
import fr.ippon.sample.web.rest.util.HeaderUtil;
import fr.ippon.sample.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Authority.
 */
@RestController
@RequestMapping("/api")
public class AuthorityResource {

    private final Logger log = LoggerFactory.getLogger(AuthorityResource.class);

    private static final String ENTITY_NAME = "authority";

    private final AuthorityRepository authorityRepository;

    public AuthorityResource(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    /**
     * POST  /authorities : Create a new authority.
     *
     * @param authority the authority to create
     * @return the ResponseEntity with status 201 (Created) and with body the new authority, or with status 400 (Bad Request) if the authority has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/authorities")
    @Timed
    public ResponseEntity<Authority> createAuthority(@RequestBody Authority authority) throws URISyntaxException {
        log.debug("REST request to save Authority : {}", authority);
        if (authority.getId() != null) {
            throw new BadRequestAlertException("A new authority cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Authority result = authorityRepository.save(authority);
        return ResponseEntity.created(new URI("/api/authorities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /authorities : Updates an existing authority.
     *
     * @param authority the authority to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated authority,
     * or with status 400 (Bad Request) if the authority is not valid,
     * or with status 500 (Internal Server Error) if the authority couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/authorities")
    @Timed
    public ResponseEntity<Authority> updateAuthority(@RequestBody Authority authority) throws URISyntaxException {
        log.debug("REST request to update Authority : {}", authority);
        if (authority.getId() == null) {
            return createAuthority(authority);
        }
        Authority result = authorityRepository.save(authority);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, authority.getId().toString()))
            .body(result);
    }

    /**
     * GET  /authorities : get all the authorities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of authorities in body
     */
    @GetMapping("/authorities")
    @Timed
    public ResponseEntity<List<Authority>> getAllAuthorities(Pageable pageable) {
        log.debug("REST request to get a page of Authorities");
        Page<Authority> page = authorityRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/authorities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /authorities/:id : get the "id" authority.
     *
     * @param id of the authority to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the authority, or with status 404 (Not Found)
     */
    @GetMapping("/authorities/{id}")
    @Timed
    public ResponseEntity<Authority> getAuthority(@PathVariable Long id) {
        log.debug("REST request to get Authority : {}", id);
        Authority authority = authorityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(authority));
    }

    /**
     * DELETE  /authorities/:id : delete the "id" authority.
     *
     * @param id of the authority to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/authorities/{id}")
    @Timed
    public ResponseEntity<Void> deleteAuthority(@PathVariable Long id) {
        log.debug("REST request to delete Authority : {}",  id);
        authorityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
