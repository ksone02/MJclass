import React, { useEffect, useState } from 'react';
import './ArticlesPlus.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function ArticlesPlus({match}) {
    const [number, setnumber] = useState();
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const [userNickname, setuserNickname] = useState("");
    const [isAnomy, setisAnomy] = useState(false);
    const [date, setdate] = useState();

    const checkDate = (date) => {
        let nowDate = new Date();
        const newDate = new Date(date);
        const elapsedMsec = nowDate.getTime() - newDate.getTime();
        const elapsedSec = elapsedMsec / 1000;
        const elapsedMin = elapsedSec / 60;
        const elapsedHour = elapsedMin / 60;
        const elapsedDay = elapsedHour / 24;
        const elapsedWeek = elapsedDay / 7;
        const elapsedMonth = elapsedWeek / 4;
        const elapsedYear = elapsedMonth / 4;
        let dateResult;
        if(elapsedYear > 1) dateResult = parseInt(elapsedYear) + "년";
        else if(12 > elapsedMonth && elapsedMonth > 1) dateResult = parseInt(elapsedMonth) + "개월";
        else if(4 > elapsedWeek && elapsedWeek > 1) dateResult = parseInt(elapsedWeek) + "주";
        else if(7 > elapsedDay && elapsedDay > 1) dateResult = parseInt(elapsedDay) + "일";
        else if(24 > elapsedHour && elapsedHour > 1) dateResult = parseInt(elapsedHour) + "시간";
        else if(60 > elapsedMin && elapsedMin > 1) dateResult = parseInt(elapsedMin) + "분";
        else if(60 > elapsedSec) dateResult = "방금";
        
        return dateResult;
    }
    const detailPost = async() => {
        try {
            const detailPostResponse = await axios.post('http://localhost:3001/postDetail', {number: match.params.userId});
            settitle(detailPostResponse.data[0].title);
            setcontent(detailPostResponse.data[0].content);
            setuserNickname(detailPostResponse.data[0].userNickname);
            setisAnomy(detailPostResponse.data[0].isAnony);
            setdate(detailPostResponse.data[0].date);
        } catch(e) {
            alert("오류발생");
        }
    }
    useEffect(() => {
        detailPost();
    }) 
    return (
        <div className="main">
            <div className="wrap title">
                <h1>
                    <a href="/377398">인문캠 자유게시판</a>
                </h1>
                <hr />
            </div>
            <div className="wrap articles">
                <article>
                    <a className="article" >
                        <img src="	https://cf-fpi.everytime.kr/0.png" className="picture large" alt="profile"/>
                        <div className="profile">
                            <h3 className="large">{isAnomy ? "익명" : userNickname}</h3>
                            <time className="large">{checkDate(date) + "전"}</time>
                        </div>
                        <ul className="status">
                            <li className="messagesend">쪽지</li>
                            <li className="abuse">신고</li>
                        </ul>
                        <hr />
                        <h2 className="large">{title}</h2>
                        <p className="large">{content}</p>
                        <ul className="status left">
                            <li title="공감" className="vote">0</li>
                            <li title="댓글" className="comment">1</li>
                            <li title="스크랩" className="scrap">0</li>
                        </ul>
                        <hr />
                        <div className="buttons">
                            <span className="posvote">공감</span>
                            <span className="scrap">스크랩</span>
                        </div>
                    </a>
                    <div className="comments" style={{display: "block"}}>
                        <article className="parent">
                            <img src="https://cf-fpi.everytime.kr/0.png" className="picture medium" alt="profile"/>
                            <h3 className="medium">익명1</h3>
                            <ul className="status">
                                <li className="childcomment">대댓글</li>
                                <li className="commentvote">공감</li>
                                <li className="messagesend">쪽지</li>
                                <li className="abuse">신고</li>
                            </ul>
                            <hr />
                            <p className="large">나 여잔데 내 자취방 어때</p>
                            <time className="medium">방금</time>
                            <ul className="status commentvotestatus">
                                <li className="vote commentvote" style={{display: "none"}}>0</li>
                            </ul>
                        </article>
                        <form className="writecomment">
                            <input type="text" name="text" placeholder="댓글을 입력하세요." className="text" />
                            <ul className="option">
                                <li title="익명" className="anonym"></li>
                                <li title="완료" className="submit"></li>
                            </ul>
                            <div className="clearBothOnly"></div>
                        </form>
                    </div>
                </article>    
            </div>
        </div>
    )
}

export default withRouter(ArticlesPlus);
