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
            height: 0,
            duration: 0.5,
            onStart: () => {
              document.querySelector(".earth-element").classList.add("active");
            },
            zIndex: '10',
            ease: "power4.out",
            stagger: 0.3,
          });
      }
    },
  });

  const fireInput = useStateMachineInput(rive, "earth-anim", "animate");

  return (
    <>
      <div className="fixed w-full h-full z-40 top-0 bg-mainBg preloader-container flex flex-col justify-center items-center pb-[100px] text-center">
        <RiveComponent className="earth-element h-[70%] w-full" />
        <div className="overflow-hidden">
          <h1 className="text-4xl heading translate-y-[100px]">
            Where in the world?
          </h1>
        </div>
      </div>
      <div className="fixed w-full h-full z-30 top-0 bg-cardBg preloader-container"></div>
    </>
  );
}
