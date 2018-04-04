package fr.ippon.sample.service.mapper;

import fr.ippon.sample.domain.Role;
import fr.ippon.sample.service.dto.RoleDTO;

import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by sorin on 03/04/2018.
 */
public class RoleMapper {


    public static Role roleDTOtoRole(RoleDTO roleDto){
        Role role = new Role();
        role.setId(roleDto.getId());
        role.setName(roleDto.getName());
        role.setAuthorities(roleDto.getAuthorities().stream()
            .filter(Objects::nonNull)
            .map(AuthorityMapper::authorityDTOToAuthority)
            .collect(Collectors.toSet()));
        return role;
    }

    public static RoleDTO roleToRoleDTO(Role role){
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setName(role.getName());
        roleDTO.setId(role.getId());
        roleDTO.setAuthorities(role.getAuthorities().stream()
            .filter(Objects::nonNull)
            .map(AuthorityMapper::authorityToAuthorityDTO)
            .collect(Collectors.toSet()));
        return roleDTO;
    }

}
