// src/contexts/AudioContext.js
import React, {
  createContext,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  // We switch from single "track" to "trackList"
  // and also keep track of "currentTrackIndex"
  const [trackList, setTrackList] = useState([
    "/audio/オバアチャン.mp3",
    "/audio/Ashes of Dreams.mp3",
    "/audio/Song of the Ancients.mp3",
    "/audio/Rick Astley - Never Gonna Give You Up (Official Music Video).mp3",
    "/audio/「てをつなごう」ムービー.mp3",
  ]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // We'll dynamically derive the "current" track from trackList & currentTrackIndex
  const track = trackList[currentTrackIndex] || "";

  const [trackTitle, setTrackTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!track) return;

    // e.g. "/audio/オバアチャン.mp3"
    // 1) get filename: "オバアチャン.mp3"
    const fileName = track.substring(track.lastIndexOf("/") + 1);
    // 2) remove extension => "オバアチャン"
    //    (assuming there's a dot in the filename)
    const title = fileName.includes(".")
      ? fileName.substring(0, fileName.lastIndexOf("."))
      : fileName;

    setTrackTitle(title);
  }, [track]);

  const contextValue = useMemo(() => {
    const handlePlay = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      }
    };

    const togglePlayPause = () => {
      if (!isPlaying) {
        handlePlay();
      } else {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };

    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    const backThirty = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(
          0,
          audioRef.current.currentTime - 30
        );
      }
    };

    const forwardThirty = () => {
      if (audioRef.current) {
        const newTime = audioRef.current.currentTime + 30;
        if (newTime >= duration) {
          // If we skip beyond the end, jump to next track
          nextTrack();
        } else {
          audioRef.current.currentTime = newTime;
        }
      }
    };

    const changeRange = (e) => {
      const value = e.target.value;
      if (audioRef.current) {
        audioRef.current.currentTime = value;
        setCurrentTime(value);
      }
    };

    const calculateTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Additional methods to handle track navigation
    const nextTrack = () => {
      setCurrentTime(0);
      setIsPlaying(false);
      setCurrentTrackIndex(
        (prevIndex) => (prevIndex + 1) % trackList.length // wrap around
      );
    };

    const prevTrack = () => {
      setCurrentTime(0);
      setIsPlaying(false);
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === 0 ? trackList.length - 1 : prevIndex - 1
      );
    };

    return {
      isPlaying,
      currentTime,
      duration,
      trackList,
      setTrackList,
      currentTrackIndex,
      setCurrentTrackIndex,
      track,
      trackTitle,
      audioRef,
      togglePlayPause,
      updateTime,
      backThirty,
      forwardThirty,
      changeRange,
      calculateTime,
      nextTrack,
      prevTrack,
      isExpanded,
      setIsExpanded,
    };
  }, [
    isPlaying,
    currentTime,
    duration,
    track,
    trackTitle,
    isExpanded,
    trackList,
    currentTrackIndex,
  ]);

  // Auto-play when the context first mounts (page load)
  useEffect(() => {
    // If there's a valid track, attempt to play it.
    if (track) {
      contextValue.togglePlayPause(); // auto-play first song
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever the "track" changes (e.g., next/prev), auto-play again
  useEffect(() => {
    if (track) {
      // We'll directly call "handlePlay" from contextValue
      // This ensures the newly-selected track starts playing automatically
      contextValue.togglePlayPause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AudioContext, AudioProvider };
