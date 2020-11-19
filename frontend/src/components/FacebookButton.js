import React from "react";
import {FacebookShareButton, FacebookIcon} from "react-share";
       
export default function SocialMediaButtons(props) {
    var quizTimeTaken = props.timeTaken
    var score = props.playerLevel
       return (
             <FacebookShareButton 
                url={"http://www.quizapp.com"}
                quote={"My scores after taking java quiz!\n"+score + "\n" + "Time Taken " +quizTimeTaken}
                hashtag="#facebook"
                >
                 <FacebookIcon size={36} />
              </FacebookShareButton>
       );
}