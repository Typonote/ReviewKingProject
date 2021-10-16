import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { toast, ToastContainer } from 'react-toastify';
import Logo from '../logo';
import Marginer from '../marginer';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
  const scrollToServiceSection = () => {
    scroller.scrollTo('ServicePageContainer', { smooth: true, duration: 1500 });
  };

  const ToastifyOnClickHandler = () => {
    return toast.info('reviewking@gmail.com로 문의 주세요.', {
      className: 'custom-toast',
      draggable: true,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <div className="FooterContainer">
      <Marginer direction="vertical" margin="3rem" />
      <Logo />
      <Marginer direction="vertical" margin="1rem" />
      <div className="GuideContainer">
        <div className="PrivacyContainer">
          <Link to="/" className="Link" onClick={scrollToServiceSection}>
            <div className="Link">서비스 소개</div>
          </Link>
          <Marginer direction="horizontal" margin="2rem" />
          <ToastContainer autoClose={8000} />
          <div className="Link" onClick={ToastifyOnClickHandler}>
            서비스 문의
          </div>
        </div>
        <div className="SocialIcon">
          <a href="https://kdt-gitlab.elice.io/002-part3-deliveryservice/team7/sample-project">
            <FontAwesomeIcon
              icon={faGitlab}
              style={{
                color: '$main_white',
                textDecoration: 'none',
              }}
            />
          </a>
        </div>
      </div>
      <Marginer direction="vertical" margin="2rem" />
      <div className="RightsReserved">
        &copy; 2021 ReviewKing All rights reserved
      </div>
    </div>
  );
}
