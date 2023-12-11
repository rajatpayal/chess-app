import React from "react";
import Footer from "../components/footer/footer";
import Header from "../components/headers/header";
import { useNavigate} from 'react-router-dom';
// import Sidebar from "../components/sidebar/sidebar";
import ChessboardComponent from "../components/chessboard/chessboard";
import "./firstPage.css";

function FirstPage() {
    const navigate = useNavigate();

    const handlePlayOnline = ()=>{
      navigate('/login');
    }
    
    return (
      <div className="App">
        <Header />
        <main>
          <ChessboardComponent />
          <div className="sidebar">
            <h3 className="sidebar-heading">Game Options</h3>
            <div className="sidebar-buttons">
                <button  onClick={handlePlayOnline} className="sidebar-button" >
                    Play Online
                </button>
                <button className="sidebar-button" >
                    Play Computer
                </button>
            </div>
          </div>
          {/* <Sidebar /> */}
        </main>
        <Footer />
      </div>
    );
  }
  
  export default FirstPage;