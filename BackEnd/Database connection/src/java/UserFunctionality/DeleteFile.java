/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package UserFunctionality;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static javax.swing.JOptionPane.showMessageDialog;

/**
 * This class runs a query with the user inputting USERNAME and PASSWORD.
 * 
 * It starts with requesting parameters from html form. After that it creates a
 * connection to the database. Then it runs a query and if it goes through,
 * a cookie is created with username as value and home.html is accessible by the user.
 * 
 * @author oskar
 */
public class DeleteFile extends HttpServlet {

    public void doGet(HttpServletRequest request,HttpServletResponse response)
            throws ServletException, IOException{
        
        response.setContentType("text/html;charset=UTF-8");
        
        try(PrintWriter out = response.getWriter()){

        String filename = request.getParameter("delete");
        
        MyDb db = new MyDb();
        Connection con = db.getCon();
        PreparedStatement pst = con.prepareStatement("DELETE FROM lorembox.files WHERE file_name=?");
        
        pst.setString(1, filename);

        ResultSet rs = pst.executeQuery();

        
        if (rs.next()){
            out.println("<script type='text/javascript'>");
            out.println("alert('File deleted succesfully')");
            out.println("window.location.href = 'home.html';");
            out.println("</script>");
            
        } else {
            out.println("<script type='text/javascript'>");
            out.println("alert('There was an error deleting your file. Please contact server administrator')");
            out.println("window.location.href = 'home.html';");
            out.println("</script>");
        }
        
        } catch (SQLException ex) {
        Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}

