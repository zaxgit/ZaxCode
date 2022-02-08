import React from "react";
import reactDom from "react-dom";
import './blogcard.css';
// import { gsap } from "gsap";
// import { CSSRulePlugin } from "gsap/CSSRulePlugin";

// gsap.registerPlugin(CSSRulePlugin);

export function BlogCard (props) {
    const post = props.node;

    return(
        <div className='blogcard_wrapper'>
            <div className="blogcard_overlay">
            <span>View Project</span>
            </div>
            <img src={post.feature_image} alt='project'/>
            <div className ='blogcard_text'>
                <div className='blogcard_top_content'>
                    <h4 className='blogcard_title'>{post.title}</h4>
                    <h5 className='blogcard_read_time'>{post.reading_time} <span>min</span></h5>
                </div>
                <p> {post.excerpt}</p>
            </div>
            <span>hover here!</span>
        </div>
    )
}
