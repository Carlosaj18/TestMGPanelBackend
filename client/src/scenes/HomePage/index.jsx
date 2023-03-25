import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import logo from "assets/Vector.svg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactInfo from "components/ContactInfo";
import Date from "components/Date";
import ClientProvider from "components/ClientProvider";
import { usePostSignUpMutation } from "state/api";

function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();

  const handleRegister = async () => {
    try {
      const data = {
        name: name,
        email: email,
      };
      triggerSignUp(data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("The user has already registered with that email");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (resultSignUp.data) {

      setName("");
      setEmail("");
      toast.success("It has been successfully registered");
    } else if (resultSignUp.error) {
      toast.error("The user has already registered with that email");
    }
  }, [resultSignUp.data, resultSignUp.error]);

  return (
    <>
      {/* client provider -Notification */}
      <ClientProvider />
      <div className="home-page">
        <div className="home-container">
          {/** Left container */}
          <div className="left-container">
            <div className="left-container-header">
              <div className="logo">
                <img src={logo} alt="Logo WEE LOGISTICS" />
              </div>
              <div className="texto-logo">WEE LOGISTICS</div>
            </div>
            <div className="left-container-social-media">
              <LinkedInIcon fontSize="large" />
              <FacebookRoundedIcon fontSize="large" />
              <InstagramIcon fontSize="large" />
            </div>
            <div className="left-container-info">
              <ContactInfo
                customClass="location"
                icon={<FmdGoodIcon fontSize="large" />}
                title="Panamá"
              />
              <ContactInfo
                icon={<AlternateEmailIcon fontSize="medium" />}
                title="contact.weelogistics@gmail.com"
              />
              <ContactInfo
                icon={<PhoneIcon fontSize="medium" />}
                title="+507 12346798"
              />
            </div>
          </div>
          {/** Right container */}
          <div className="right-container">
            <div className="right-main-container">
              <div className="title-container">PRÓXIMAMENTE</div>
              <p className="paragraph-container">
                Brindamos soluciones personalizas para satisfacer tus
                necesidades de transporte y almacenamiento de tus productos.
              </p>
              <div className="availability">
                <Date number="138" time="Días" />
                <Date number="7" time="horas" />
                <Date number="25" time="Minutos" />
              </div>
              <p className="email-paragraph-container">
                ¡Déjanos tu correo para mantenerte actualizado!
              </p>
              <div className="subscribe-form">
                <div className="subscribe-form-inputs">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                  />
                </div>
                <button className="sumbit" onClick={handleRegister}>
                  SUSCRIBETE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
