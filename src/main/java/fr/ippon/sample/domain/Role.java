package fr.ippon.sample.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Role.
 */
@Entity
@Table(name = "jhi_role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "jhi_role_authorities",
               joinColumns = @JoinColumn(name="roles_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="authorities_id", referencedColumnName="id"))
    private Set<Authority> authorities = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "jhi_role_users",
               joinColumns = @JoinColumn(name="roles_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="users_id", referencedColumnName="id"))
    private Set<User> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Role name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public Role authorities(Set<Authority> authorities) {
        this.authorities = authorities;
        return this;
    }

    public Role addAuthorities(Authority authority) {
        this.authorities.add(authority);
        return this;
    }

    public Role removeAuthorities(Authority authority) {
        this.authorities.remove(authority);
        return this;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Role users(Set<User> users) {
        this.users = users;
        return this;
    }

    public Role addUsers(User user) {
        this.users.add(user);
        user.getRoles().add(this);
        return this;
    }

    public Role removeUsers(User user) {
        this.users.remove(user);
        user.getRoles().remove(this);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Role role = (Role) o;
        if (role.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), role.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
