import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ srcUrl }) => {
  const videoNode = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoNode.current) return;

    // Create <video-js> dynamically
    const videoEl = document.createElement("video-js");
    videoEl.classList.add("vjs-big-play-centered", "video-js");
    videoNode.current.appendChild(videoEl);

    playerRef.current = videojs(videoEl, {
      autoplay: false,
      controls: true,
      preload: "auto",
      // fluid: true,
      width: 852,
      height: 450,
      playbackRates: [0.5, 1, 1.25, 1.5, 2], // speed control
      userActions: {
        hotkeys: true, // Enable built-in keyboard shortcuts
      },
      controlBar: {
        children: [
          "playToggle",
          "volumePanel",
          "currentTimeDisplay",
          "progressControl",
          "durationDisplay",
          "playbackRateMenuButton",
          "pictureInPictureToggle",
          "fullscreenToggle",
        ],
      },
      sources: [
        {
          src: srcUrl,
          type: "application/x-mpegURL",
        },
      ],
    });

    return () => {
      // Dispose player first
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      // Remove element safely
      if (videoNode.current) {
        videoNode.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoNode}></div>
    </div>
  );
};

export default VideoPlayer;
