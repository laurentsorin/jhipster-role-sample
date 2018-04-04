# jHipster Role Management
This application was generated using JHipster 4.14.1, you can find documentation and help at [http://www.jhipster.tech/documentation-archive/v4.14.1](http://www.jhipster.tech/documentation-archive/v4.14.1).
<br> The goal of this project is to change the authority management and create a "Role" logical level of authorities
<br>Once this project will be fine, I'll provide this as module for jhipster


What are the features ? 

* New Role and Authority screens : You can now create your own authorities and roles which themselves aggregate authorities
    * NB : Role created must be prefixed by "ROLE_" (TODO : improvement in role creation form)
* User Management screen: You can affect Users roles (and not authorities directly)
* In front-end directive, now you can use "jhiHasAnyRole" to improve the granularity of your permissions


Under the hood in few words :
* New tables jhi_role, jhi_role_users, jhi_role_authorities
* jhi_authority has a new "id" column
* Model of User and UserDTO have changed with a new "roles" attribute (no more "authorities")
* DomainUserDetailService aggregate all authorities of each role in a list of SimpleGrantedAuthority
* principal.service.ts have been changed according new userDTO model (and to make distinction between role/authorities)
* Unit tests updated with new User model

To improve :
* Remove ROLE_ prefix (help is welcome)
* Improve user-route-access-service to handle roles and authorities from data of Routes
    * Pre-requiste : Generated entities Route must be changed to add "roles" has route data
    
Constraints :
* Works only for 
    * SQL database
    * Angular
