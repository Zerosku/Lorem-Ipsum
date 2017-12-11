
package Controller;
 
import Model.Files;
import Model.Users;
import com.google.gson.Gson;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

 
/**
 *
 
 */
@Stateless
public class DBControl {
   
    @PersistenceContext
    private EntityManager em;
 
    public DBControl() {
    }
    public List<Users> getAll(){
       List<Users> lst = em.createNamedQuery("User.findAll").getResultList(); 
       return lst;
        //em.createNamedQuery("users.findAll").getResultList();
        //List<User> lst = em.createNamedQuery("User.findAll").getResultList(); return lst;
    }
    public String getUser(Users u) {
    
        return em.createNamedQuery("users.findByName").toString();
    }
    
    public List<Files> getMedia(String username){
        List<Files> lst = em.createNamedQuery("Files.findUserFiles").setParameter("username", username).getResultList();
        return lst;
    }
    
    
    //asking user object, because we don't now that user id yet
    public Users insert (Users u){
        em.persist(u);
        return u;
    }
   
    public Files insertFiles (Files f){
        em.persist(f);
        return f;
    }
}
    
    
    

/*    void getAll(String name) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}*/