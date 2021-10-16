import './introduceContent.scss';
import React from 'react';
import Members from '../../const/member';
import Marginer from '../../components/marginer';
import IntroImage from '../../assets/pictures/infopicture.png';

export default function IntroduceContent() {
  return (
    <div className="IntroduceContainer">
      <div className="ServiceIntroContainer">
        <div className="Intro">리뷰왕은 플랫폼 별</div>
        <div className="Intro">리뷰의 차이를 분석합니다.</div>
        <Marginer direction="vertical" margin="1rem" />
        <div className="subIntro">
          플랫폼 별 맛집 평점이 서로 다르다는 사실.
          <br />
          알고 계셨나요?
        </div>
      </div>
      <Marginer direction="vertical" margin="2rem" />

      <div className="IntroduceImage">
        <img alt="" className="IntroImage" src={IntroImage} />
      </div>

      <Marginer direction="vertical" margin="2rem" />

      <div className="SubIntroConatiner">
        <div className="Intro">리뷰를 비교해보며</div>
        <div className="subIntro">
          사용자에게 '어떤 플랫폼이 더 낫다'라고 알려주기보다는 플랫폼 별로
          비교를 할 수 있도록 합니다.
        </div>
        <Marginer direction="vertical" margin="1rem" />
        <div className="Intro">사용자는 더 좋은 선택을</div>
        <div className="subIntro">
          이를 통해 합리적인 선택을 할 수 있게 될 것입니다.
        </div>
      </div>

      <Marginer direction="vertical" margin="4rem" />

      <h2 className="TitleText">팀원 소개</h2>
      <div className="PeopleIntroContainer">
        {Members.map(option => (
          <div className="CardContainer">
            <img alt="" className="CardIcon" src={option.src} />
            <h2 className="PeopleText">{option.name}</h2>
            <h2 className="PeopleRoleText">{option.role}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
