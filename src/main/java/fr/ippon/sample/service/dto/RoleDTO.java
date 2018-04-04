package fr.ippon.sample.service.dto;

import java.util.Set;

/**
 * Created by sorin on 03/04/2018.
 */
public class RoleDTO {

    private String name;

    private Long id;

    private Set<AuthorityDTO> authorities;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<AuthorityDTO> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<AuthorityDTO> authorities) {
        this.authorities = authorities;
    }
}
