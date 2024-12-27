// src/components/AudioPlayer.jsx
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../css/AudioPlayer.module.css";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsSkipStart,
  BsSkipEnd,
} from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdExpand, IoMdContract } from "react-icons/io";
import { AudioContext } from "../contexts/AudioContext";

const AudioPlayer = ({ chapters, timeJump }) => {
  const {
    isPlaying,
    currentTime,
    duration,
    track,
    trackTitle,
    audioRef,
    togglePlayPause,
    updateTime,
    backThirty,
    forwardThirty,
    changeRange,
    calculateTime,
    isExpanded,
    setIsExpanded,
    nextTrack,
    prevTrack,
  } = useContext(AudioContext);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = track;
      audioRef.current.currentTime = timeJump;
    }
  }, [track, timeJump, audioRef]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${styles.audioPlayer} ${isExpanded ? styles.expanded : ""}`}
    >
      {/* Our audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={updateTime}
        onEnded={nextTrack}
      >
        <track kind="captions" />
      </audio>
      {/* Floating Icon (Collapsed State) */}
      {!isExpanded && (
        <button onClick={toggleExpand} className={styles.floatingIcon}>
          <IoMdExpand />
        </button>
      )}
      {/* Expanded Content */}
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.header}>
            {/* Display the file-based track title */}
            <div className={styles.trackTitle}>{trackTitle}</div>
            <button onClick={toggleExpand} className={styles.collapseButton}>
              <IoMdContract />
            </button>
          </div>

          <div className={styles.controls}>
            {/* Example: Buttons to switch track */}
            <button onClick={prevTrack} className={styles.prevNext}>
              <BsSkipStart size={20} />
            </button>
            <button className={styles.forwardBackward} onClick={backThirty}>
              <BsArrowLeftShort /> 30
            </button>
            <button
              onClick={togglePlayPause}
              className={`${styles.playPause} ${
                isPlaying ? styles.isPlaying : ""
              }`}
            >
              {isPlaying ? (
                <FaPause className={styles.icon} />
              ) : (
                <FaPlay className={styles.icon} />
              )}
            </button>
            <button className={styles.forwardBackward} onClick={forwardThirty}>
              30 <BsArrowRightShort />
            </button>
            <button onClick={nextTrack} className={styles.prevNext}>
              <BsSkipEnd size={20} />
            </button>
          </div>

          <div className={styles.timeControls}>
            <div className={styles.currentTime}>
              {calculateTime(currentTime)}
            </div>
            <div className={styles.progressBarWrapper}>
              <input
                type="range"
                className={styles.progressBar}
                value={currentTime}
                max={duration}
                onChange={changeRange}
              />
              {chapters.map((chapter) => (
                <div
                  key={`${chapter.start}-${chapter.end}`}
                  className={`${styles.chapter} ${
                    chapter.start === 0 ? styles.start : ""
                  } ${chapter.end === duration ? styles.end : ""}`}
                  style={{
                    "--left": `${(chapter.start / duration) * 100}%`,
                    "--width": `${
                      ((chapter.end - chapter.start) / duration) * 100
                    }%`,
                  }}
                />
              ))}
            </div>
            <div className={styles.duration}>
              {duration ? calculateTime(duration) : "00:00"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AudioPlayer.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    })
  ),
  timeJump: PropTypes.number,
};

AudioPlayer.defaultProps = {
  chapters: [],
  timeJump: 0,
};

export default AudioPlayer;
