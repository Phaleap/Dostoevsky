import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Pages/Home.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const part2Ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
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

      const panels = gsap.utils.toArray(".panel");
      const texts = gsap.utils.toArray(".panel p");
      gsap.set(panels.slice(1), { opacity: 0, y: 100 });
      gsap.set(texts, { color: "rgba(255, 255, 255, 0.2)" }); 
      gsap.set(texts[0], { color: "rgba(255, 255, 255, 1)" }); 

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
   const reveals = gsap.utils.toArray(
  section2Ref.current.querySelectorAll(".reveal")
);

gsap.set(reveals, {
  opacity: 0,
  y: 60,
});

gsap.to(reveals, {
  opacity: 1,
  y: 0,
  stagger: {
    each: 0.35,
    ease: "power2.out",
  },
  ease: "power2.out",
  scrollTrigger: {
    trigger: section2Ref.current,
    start: "top 75%",
    end: "bottom 40%",
    scrub: 1.2,  
    once: true
  },
});

      panels.forEach((panel, i) => {
        if (i > 0) {
          tl.to(panels[i - 1], { opacity: 0, y: -30, duration: 1 }, ">") 
            .to(texts[i - 1], { color: "rgba(255, 255, 255, 0.2)", duration: 0.5 }, "<") 
            .to(panel, { opacity: 1, y: 0, duration: 1 }, "<")
            .to(texts[i], { color: "rgba(255, 255, 255, 1)", duration: 1 }, "-=0.5");
        }
      });
    }, section1Ref);

    return () => ctx.revert();
  }, []);
useEffect(() => {
  const container = section2Ref.current.querySelector(".dots-container");
  const dots = [];
  const dotCount = 1000;

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.left = `${Math.random() * 100}%`;
    container.appendChild(dot);
    dots.push(dot);
    gsap.to(dot, {
      x: `+=${gsap.utils.random(-80, 80)}`,
      y: `+=${gsap.utils.random(-80, 80)}`,
      duration: gsap.utils.random(6, 12),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }

  return () => {
    dots.forEach(dot => container.removeChild(dot));
  };
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
     <section className="section2" ref={section2Ref}>
  <div className="dots-container"></div>  
  
  <p className="reveal">Chapter</p>

  <div className="chapter1 reveal">
    <p>1</p>
  </div>

  <em className="reveal" style={{ fontSize: "2rem" }}>
    .Born into Shadows.
  </em>

  <h1 className="reveal">
    A child grows up between sickness, silence, and stories. In a hospital courtyard in Moscow, a mind begins to form—one that will one day stare directly into human suffering.
  </h1>
</section>

<section style={{height: "100vh", backgroundColor: "black"}}>
    <div className="years">

    </div>
    <div className="description">
      
    </div>

</section>

        
      </div>
    </div>
  );
};

export default Home;