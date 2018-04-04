package fr.ippon.sample.repository;

import fr.ippon.sample.domain.Role;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("select distinct jhi_role from Role jhi_role left join fetch jhi_role.authorities left join fetch jhi_role.users")
    List<Role> findAllWithEagerRelationships();

    @Query("select jhi_role from Role jhi_role left join fetch jhi_role.authorities left join fetch jhi_role.users where jhi_role.id =:id")
    Role findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select jhi_role from Role jhi_role left join fetch jhi_role.authorities left join fetch jhi_role.users where jhi_role.name =:name")
    public Role findByNameWithEagerRelationships(@Param("name") String name);
}
