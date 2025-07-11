"use client";

import React from 'react';

export default function MinimalStatsAnimation() {
  return (
    <section className="minimal-stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {/* Response Time */}
          <div className="stat-card">
            <div className="stat-glow"></div>
            <div className="stat-content">
              <div className="stat-number">
                <span className="number">47</span>
                <span className="unit">s</span>
              </div>
              <div className="stat-text">Response Time</div>
            </div>
            <div className="stat-bg-number">47</div>
          </div>

          {/* Always Active */}
          <div className="stat-card">
            <div className="stat-glow"></div>
            <div className="stat-content">
              <div className="stat-number">
                <span className="number">24/7</span>
              </div>
              <div className="stat-text">Always Active</div>
            </div>
            <div className="stat-bg-number">24</div>
          </div>

          {/* Channels */}
          <div className="stat-card">
            <div className="stat-glow"></div>
            <div className="stat-content">
              <div className="stat-number">
                <span className="number">4</span>
                <span className="unit">+</span>
              </div>
              <div className="stat-text">Channels</div>
            </div>
            <div className="stat-bg-number">4</div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="float-element element-1"></div>
          <div className="float-element element-2"></div>
          <div className="float-element element-3"></div>
        </div>
      </div>
    </section>
  );
}