import React from "react";
import "./styles/footer.css"; // Import CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__section">
                        <h3>About Us</h3>
                        <p>Welcome to our Electric Vehicle Showroom in Sambalpur, your go-to showroom for top-quality electric bikes and scooters, We offer a diverse range of eco-friendly vehicles to suit every need and lifestyle,</p>
                    </div>
                    <div className="footer__section">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><p>Email: bikashvickysahu219@gmail.com</p></li>
                            <li><p>Phone: 8917674394</p></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h3>Follow Us</h3>
                        <ul>
                            <li style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}><img src="./images/facebook.png" alt="fcb"/><p>Facebook</p></li>
                            <li style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}><img src="./images/twitter.png" alt="twt"/><p>Twitter</p></li>
                            <li style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}><img src="./images/instagram.png" alt="inst"/><p>Instagram</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
