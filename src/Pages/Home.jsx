import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Pages/Home.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const section1Ref = useRef(null);
  const part2Ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Expansion Animation
      gsap.to(section1Ref.current, {
        width: "100%",
        borderRadius: "0px",
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top top",
          end: "top+=150",
          scrub: true,
        },
      });

      // 2. Panels & Font Color Animation
      const panels = gsap.utils.toArray(".panel");
      const texts = gsap.utils.toArray(".panel p");

      // Set initial states: panels hidden/down, texts dimmed
      gsap.set(panels.slice(1), { opacity: 0, y: 30 });
      gsap.set(texts, { color: "rgba(255, 255, 255, 0.2)" }); // Dimmed initially
      gsap.set(texts[0], { color: "rgba(255, 255, 255, 1)" }); // First text is bright

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: part2Ref.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          snap: 1 / (panels.length - 1),
          onUpdate: (self) => {
            const index = Math.round(self.progress * (panels.length - 1)) + 1;
            setCurrentIndex(index);
          }
        },
      });

      panels.forEach((panel, i) => {
        if (i > 0) {
          tl.to(panels[i - 1], { opacity: 0, y: -30, duration: 1 }, ">") // Hide old panel
            .to(texts[i - 1], { color: "rgba(255, 255, 255, 0.2)", duration: 0.5 }, "<") // Dim old text
            .to(panel, { opacity: 1, y: 0, duration: 1 }, "<") // Show new panel
            .to(texts[i], { color: "rgba(255, 255, 255, 1)", duration: 1 }, "-=0.5"); // Brighten new text
        }
      });
    }, section1Ref);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-wrapper">
        <section className="section1" ref={section1Ref}>
          <div className="part1">
            <h1>The life of Fyodor Mikhailovich Dostoevsky</h1>
          </div>
          
          <div className="part2" ref={part2Ref}>
            <div className="autoSlide">0{currentIndex} / 03</div>
<div className="panel">
    <p>Hey there! I’m WeNo, the one-person force behind this website. I designed and built it from scratch to bring my ideas to life and share them with the world.</p>
</div>
<div className="panel">
    <p>One of my all-time favorite books is <em>Crime and Punishment</em>. Its depth and intensity left a lasting impression on me, and I love exploring works like these.</p>
</div>
<div className="panel">
    <p>Finally, I decided to create this site as a playground to sharpen my skills, especially in animation and interactive design. It’s all about learning while building something I’m proud of.</p>
</div>

          </div>
        </section>
        <div style={{ height: "100vh" }}></div>
      </div>
    </div>
  );
};

export default Home;