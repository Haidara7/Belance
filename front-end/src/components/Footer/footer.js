import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter ,MDBIcon ,MDBNavLink} from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
           
          </MDBCol>
          <MDBCol lg="2"  md="6">
          <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
                

              </MDBNavLink>

              <MDBNavLink className="waves-effect waves-light" to="#!">
              <i class="fab fa-facebook"></i>
                

              </MDBNavLink>

              <MDBNavLink className="waves-effect waves-light" to="#!">
              <i class="fab fa-linkedin"></i>                

              </MDBNavLink>


           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> Belancelb.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;