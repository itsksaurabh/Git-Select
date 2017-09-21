import javax.servlet.http.*;  
import javax.servlet.*;  
import java.io.*;  
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import javax.servlet.RequestDispatcher;

public class Register extends HttpServlet{  
public void doPost(HttpServletRequest req,HttpServletResponse res)  
throws ServletException,IOException  
{  

		RequestDispatcher requestDispatcher;

		try (Connection con = DriverManager
				.getConnection("jdbc:odbc:DB");
				Statement st = con.createStatement();) {
			Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
			String uname= req.getParameter("varname");
			String ulink=req.getParameter("varlink");
			int i = st.executeUpdate("INSERT INTO ShortList(Name,Link) VALUES('"
					+ uname + "','" + ulink + "')");
			System.out.println("Row is added");
			requestDispatcher = req.getRequestDispatcher("index.html");
			requestDispatcher.forward(req, res);
			
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}