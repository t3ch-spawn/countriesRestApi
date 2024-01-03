import React, { useEffect } from "react";
import Rive from "@rive-app/react-canvas";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import gsap from "gsap";
import SplitType from "split-type";

export default function PreLoader() {
  const { rive, RiveComponent } = useRive({
    src: "/new_file.riv",
    stateMachines: "earth-anim",
    autoplay: true,
    onStateChange: (e) => {
      const headingChars = new SplitType(".heading", { types: "words, chars" });
      console.log(e);

      if (e.data[0] == "unknown") {
        gsap
          .timeline()
          .to(".heading", {
            y: 0,
            duration: 0,
          })
          .from(document.querySelector(".heading").querySelectorAll(".char"), {
            opacity: 0,
            stagger: 0.1,
          });
      }

      if (e.data[0] == "exit") {
        gsap
          .timeline()
          .to(".heading", {
            opacity: 0,
            duration: 0.2,
          })
          .to(".preloader-container", {
            scaleY: 0,
            duration: 0.5,
            onStart: () => {
              document.querySelector(".earth-element").classList.add("active");
            },
            onComplete: () => {
              document
                .querySelectorAll(".preloader-container").forEach((loader)=>{
                    loader.classList.add("active");
                })
                document.querySelector('body').classList.add('active')
                
            },
            ease: "power4.out",
            stagger: 0.5,
          });
      }
    },
  });

  const fireInput = useStateMachineInput(rive, "earth-anim", "animate");

  return (
    <>
      <div className="fixed w-full h-full z-40 top-0 bg-mainBg preloader-container flex flex-col justify-center items-center text-center origin-top">
        <RiveComponent className="earth-element h-[60%] w-full " />
        <div className="overflow-hidden mb-[200px]">
          <h1 className="text-4xl -500:text-3xl heading translate-y-[100px] ">
            Where in the world?
          </h1>
        </div>
      </div>
      <div className="fixed w-full h-full z-30 top-0 bg-cardBg preloader-container origin-bottom"></div>
    </>
  );
}
