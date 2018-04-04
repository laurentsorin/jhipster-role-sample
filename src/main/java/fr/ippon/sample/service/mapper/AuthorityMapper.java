package fr.ippon.sample.service.mapper;

import fr.ippon.sample.domain.Authority;
import fr.ippon.sample.service.dto.AuthorityDTO;

/**
 * Created by sorin on 03/04/2018.
 */
public class AuthorityMapper {

    public static Authority authorityDTOToAuthority(AuthorityDTO authorityDTO){
        Authority authority = new Authority();
        authority.setId(authorityDTO.getId());
        authority.setName(authorityDTO.getName());
        return authority;
    }

    public static AuthorityDTO authorityToAuthorityDTO(Authority authority){
        AuthorityDTO authorityDTO = new AuthorityDTO();
        authorityDTO.setId(authority.getId());
        authorityDTO.setName(authority.getName());
        return authorityDTO;
    }
}
