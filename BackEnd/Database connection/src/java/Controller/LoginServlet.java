/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author oskar
 */
public class LoginServlet extends HttpServlet {

    public void doPost(HttpServletRequest request,HttpServletResponse response)
            throws ServletException, IOException{
        
        response.setContentType("text/html;charset=UTF-8");
        
        try(PrintWriter out = response.getWriter()){

        String username = request.getParameter("t1");
        String password = request.getParameter("t2");
        
        MyDb db = new MyDb();
        Connection con = db.getCon();
        PreparedStatement pst = con.prepareStatement("SELECT * FROM lorembox.users WHERE username=? AND passwrd=?");
        
        pst.setString(1, username);
        pst.setString(2, password);
        ResultSet rs = pst.executeQuery();
        
        Cookie ck = new Cookie("auth", username);
        ck.setMaxAge(600);
        
        if (rs.next()){
            response.addCookie(ck);
            response.sendRedirect("home.html");
            return;
        } else {
            RequestDispatcher rd = request.getRequestDispatcher("login.html");
            out.println("Wrong username or password");
            rd.include(request, response);
        }
        
        } catch (SQLException ex) {
        Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}

