import React, {useEffect} from 'react';
import CreateModuleForm from "../../module/CreateModuleForm";

import './navBar.css';

function NavBar() {

  return (
      <body>

      <div className="wrapper">

          <nav id="sidebar">
              <div className="sidebar-header">
                  <h3>Bootstrap Sidebar</h3>
              </div>

              <ul className="list-unstyled components">
                  <p>Dummy Heading</p>
                  <li className="active">
                      <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
                         className="dropdown-toggle">Home</a>
                      <ul className="collapse list-unstyled" id="homeSubmenu">
                          <li>
                              <a href="#">Home 1</a>
                          </li>
                          <li>
                              <a href="#">Home 2</a>
                          </li>
                          <li>
                              <a href="#">Home 3</a>
                          </li>
                      </ul>
                  </li>
                  <li>
                      <a href="#">About</a>
                  </li>
                  <li>
                      <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                         className="dropdown-toggle">Pages</a>
                      <ul className="collapse list-unstyled" id="pageSubmenu">
                          <li>
                              <a href="#">Page 1</a>
                          </li>
                          <li>
                              <a href="#">Page 2</a>
                          </li>
                          <li>
                              <a href="#">Page 3</a>
                          </li>
                      </ul>
                  </li>
                  <li>
                      <a href="#">Portfolio</a>
                  </li>
                  <li>
                      <a href="#">Contact</a>
                  </li>
              </ul>

              <ul className="list-unstyled CTAs">
                  <li>
                      <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download
                          source</a>
                  </li>
                  <li>
                      <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>
                  </li>
              </ul>
          </nav>


          <div id="content">

              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container-fluid">

                      <button type="button" id="sidebarCollapse" className="btn btn-info">
                          <i className="fas fa-align-left"></i>
                          <span>Toggle Sidebar</span>
                      </button>
                      <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                              data-toggle="collapse" data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent" aria-expanded="false"
                              aria-label="Toggle navigation">
                          <i className="fas fa-align-justify"></i>
                      </button>

                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="nav navbar-nav ml-auto">
                              <li className="nav-item active">
                                  <a className="nav-link" href="#">Page</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="#">Page</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="#">Page</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="#">Page</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>
          </div>

      </div>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
              integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
              crossOrigin="anonymous"></script>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
              integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
              crossOrigin="anonymous"></script>

      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
              integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
              crossOrigin="anonymous"></script>


      </body>
  )
}

export default NavBar
