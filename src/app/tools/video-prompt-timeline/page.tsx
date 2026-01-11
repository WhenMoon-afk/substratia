'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  videoPlatforms,
  motionOptions,
  transitionOptions,
  videoAspectRatios,
  momentPresets,
  categoryLabels,
  timelineSlots,
  createEmptyKeyframe,
  createEmptyTimeline,
  formatVideoPrompt,
  saveFavorite,
  getFavorites,
  deleteFavorite,
  type VideoPlatform,
  type VideoKeyframe,
  type VideoTimeline,
  type MomentCategory,
  type Motion,
  type Transition,
  type VideoAspectRatio,
} from '@/data/videoPromptPresets'

export default function VideoPromptTimelinePage() {
  const [timeline, setTimeline] = useState<VideoTimeline>(createEmptyTimeline)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<MomentCategory | null>(null)
  const [favorites, setFavorites] = useState<VideoTimeline[]>(() => getFavorites())
  const [showFavorites, setShowFavorites] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  // Get keyframe for a slot, or create empty placeholder
  const getKeyframeForSlot = useCallback((timestamp: number): VideoKeyframe | undefined => {
    return timeline.keyframes.find(k => k.timestamp === timestamp)
  }, [timeline.keyframes])

  // Add or update keyframe at timestamp
  const setKeyframe = useCallback((timestamp: number, updates: Partial<VideoKeyframe>) => {
    setTimeline(prev => {
      const existingIdx = prev.keyframes.findIndex(k => k.timestamp === timestamp)
      if (existingIdx >= 0) {
        const newKeyframes = [...prev.keyframes]
        newKeyframes[existingIdx] = { ...newKeyframes[existingIdx], ...updates }
        return { ...prev, keyframes: newKeyframes }
      } else {
        const newKeyframe = { ...createEmptyKeyframe(timestamp), ...updates }
        return { ...prev, keyframes: [...prev.keyframes, newKeyframe] }
      }
    })
  }, [])

  // Remove keyframe at timestamp
  const removeKeyframe = useCallback((timestamp: number) => {
    setTimeline(prev => ({
      ...prev,
      keyframes: prev.keyframes.filter(k => k.timestamp !== timestamp)
    }))
    if (selectedSlot === timestamp) {
      setSelectedSlot(null)
    }
  }, [selectedSlot])

  // Apply moment preset to selected slot
  const applyMoment = useCallback((promptSnippet: string, emoji: string) => {
    if (selectedSlot === null) return
    const existing = getKeyframeForSlot(selectedSlot)
    const newPrompt = existing?.prompt
      ? `${existing.prompt}, ${promptSnippet}`
      : promptSnippet
    setKeyframe(selectedSlot, { prompt: newPrompt, emoji })
  }, [selectedSlot, getKeyframeForSlot, setKeyframe])

  // Update timeline properties
  const updateTimeline = useCallback((updates: Partial<VideoTimeline>) => {
    setTimeline(prev => ({ ...prev, ...updates }))
  }, [])

  // Generated prompt
  const generatedPrompt = useMemo(() => formatVideoPrompt(timeline), [timeline])

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    if (!generatedPrompt) return
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedPrompt])

  // Download prompt
  const downloadPrompt = useCallback(() => {
    if (!generatedPrompt) return
    const blob = new Blob([generatedPrompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${timeline.name.replace(/\s+/g, '-').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [generatedPrompt, timeline.name])

  // Save to favorites
  const saveToFavorites = useCallback(() => {
    saveFavorite(timeline)
    setFavorites(getFavorites())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [timeline])

  // Load from favorites
  const loadFavorite = useCallback((fav: VideoTimeline) => {
    setTimeline(fav)
    setSelectedSlot(null)
    setShowFavorites(false)
  }, [])

  // Delete favorite
  const removeFavorite = useCallback((id: string) => {
    deleteFavorite(id)
    setFavorites(getFavorites())
  }, [])

  // Clear timeline
  const clearTimeline = useCallback(() => {
    setTimeline(createEmptyTimeline())
    setSelectedSlot(null)
  }, [])

  // Filter moments by category
  const filteredMoments = useMemo(() => {
    if (!activeCategory) return momentPresets
    return momentPresets.filter(m => m.category === activeCategory)
  }, [activeCategory])

  // Selected keyframe for editor
  const selectedKeyframe = selectedSlot !== null ? getKeyframeForSlot(selectedSlot) : null

  const categories = Object.entries(categoryLabels) as [MomentCategory, string][]

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/tools" className="text-forge-cyan hover:underline text-sm mb-4 inline-block">
            &larr; Back to Tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Video <span className="text-forge-cyan">Prompt Timeline</span>
          </h1>
          <p className="text-gray-400">
            Build frame-by-frame video prompts. Define keyframes, describe moments, export for video generation.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Timeline Name */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-500 mb-1">Timeline Name</label>
              <input
                type="text"
                value={timeline.name}
                onChange={(e) => updateTimeline({ name: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Platform</label>
              <select
                value={timeline.platform}
                onChange={(e) => updateTimeline({ platform: e.target.value as VideoPlatform })}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
              >
                {videoPlatforms.map(p => (
                  <option key={p.id} value={p.id} className="bg-forge-dark">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Aspect Ratio</label>
              <select
                value={timeline.aspectRatio}
                onChange={(e) => updateTimeline({ aspectRatio: e.target.value as VideoAspectRatio })}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
              >
                {videoAspectRatios.map(ar => (
                  <option key={ar.id} value={ar.id} className="bg-forge-dark">
                    {ar.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
              >
                {showFavorites ? 'Hide' : 'Load'} Favorites
              </button>
              <button
                onClick={clearTimeline}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-all"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Global Style */}
          <div className="mt-4">
            <label className="block text-xs text-gray-500 mb-1">Global Style (applies to all scenes)</label>
            <input
              type="text"
              value={timeline.globalStyle}
              onChange={(e) => updateTimeline({ globalStyle: e.target.value })}
              placeholder="e.g., cinematic, 4K, dramatic lighting, film grain..."
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
            />
          </div>
        </div>

        {/* Favorites Panel */}
        {showFavorites && favorites.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Saved Timelines</h3>
            <div className="space-y-2">
              {favorites.map(fav => (
                <div key={fav.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div>
                    <span className="text-white">{fav.name}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      {fav.keyframes.length} keyframes
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadFavorite(fav)}
                      className="px-3 py-1 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded text-sm"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => removeFavorite(fav.id)}
                      className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4 text-center">Timeline (30 seconds)</h3>

          {/* Timeline Track */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/20" />

            {/* Keyframe Slots */}
            <div className="flex justify-between relative z-10">
              {timelineSlots.map((timestamp) => {
                const keyframe = getKeyframeForSlot(timestamp)
                const isSelected = selectedSlot === timestamp
                const hasContent = keyframe && keyframe.prompt.trim()

                return (
                  <div key={timestamp} className="flex flex-col items-center">
                    {/* Slot Button */}
                    <button
                      onClick={() => setSelectedSlot(isSelected ? null : timestamp)}
                      className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                        isSelected
                          ? 'border-forge-cyan bg-forge-cyan/20 scale-110'
                          : hasContent
                            ? 'border-forge-purple bg-forge-purple/20 hover:border-forge-purple/80'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      {keyframe?.emoji || '⬜'}
                    </button>

                    {/* Timestamp Label */}
                    <span className={`text-xs mt-2 ${isSelected ? 'text-forge-cyan' : 'text-gray-500'}`}>
                      {timestamp}s
                    </span>

                    {/* Remove Button (if has content) */}
                    {hasContent && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeKeyframe(timestamp)
                        }}
                        className="text-xs text-red-400 hover:text-red-300 mt-1"
                      >
                        remove
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">
            Click a slot to edit. Filled slots show purple.
          </p>
        </div>

        {/* Main Grid: Moment Library + Keyframe Editor */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Moment Library */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Moment Library</h3>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  activeCategory === null
                    ? 'bg-forge-cyan text-forge-dark'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                All
              </button>
              {categories.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    activeCategory === key
                      ? 'bg-forge-cyan text-forge-dark'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Moments Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
              {filteredMoments.map(moment => (
                <button
                  key={moment.id}
                  onClick={() => applyMoment(moment.promptSnippet, moment.emoji)}
                  disabled={selectedSlot === null}
                  className={`p-2 text-left text-sm rounded-lg transition-all ${
                    selectedSlot === null
                      ? 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-forge-cyan/50'
                  }`}
                >
                  <span className="mr-1">{moment.emoji}</span>
                  {moment.name}
                </button>
              ))}
            </div>

            {selectedSlot === null && (
              <p className="text-xs text-gray-500 mt-3 text-center">
                Select a timeline slot to add moments
              </p>
            )}
          </div>

          {/* Keyframe Editor */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Keyframe Editor
              {selectedSlot !== null && (
                <span className="text-forge-cyan ml-2">({selectedSlot}s)</span>
              )}
            </h3>

            {selectedSlot !== null ? (
              <div className="space-y-4">
                {/* Prompt */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Scene Description</label>
                  <textarea
                    value={selectedKeyframe?.prompt || ''}
                    onChange={(e) => setKeyframe(selectedSlot, { prompt: e.target.value })}
                    placeholder="Describe what's happening at this moment..."
                    className="w-full h-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm resize-none"
                  />
                </div>

                {/* Motion */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Camera Motion</label>
                  <select
                    value={selectedKeyframe?.motion || 'static'}
                    onChange={(e) => setKeyframe(selectedSlot, { motion: e.target.value as Motion })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
                  >
                    {motionOptions.map(m => (
                      <option key={m.id} value={m.id} className="bg-forge-dark">
                        {m.icon} {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transition */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Transition to Next</label>
                  <select
                    value={selectedKeyframe?.transition || 'cut'}
                    onChange={(e) => setKeyframe(selectedSlot, { transition: e.target.value as Transition })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
                  >
                    {transitionOptions.map(t => (
                      <option key={t.id} value={t.id} className="bg-forge-dark">
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Emoji Picker (simple) */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Thumbnail Icon</label>
                  <div className="flex gap-2 flex-wrap">
                    {['🎬', '🏃', '💥', '🌅', '🌙', '🎭', '🔥', '💫', '🌊', '⚡'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => setKeyframe(selectedSlot, { emoji })}
                        className={`w-10 h-10 rounded-lg text-xl transition-all ${
                          selectedKeyframe?.emoji === emoji
                            ? 'bg-forge-cyan/30 border border-forge-cyan'
                            : 'bg-white/10 border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-4xl mb-4">🎬</p>
                <p>Select a timeline slot to edit</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Output */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-400">Generated Prompt</h3>
            <span className="text-xs text-gray-500">
              {videoPlatforms.find(p => p.id === timeline.platform)?.name} format
            </span>
          </div>

          <div className="bg-black/30 rounded-lg p-4 min-h-[120px]">
            {generatedPrompt ? (
              <pre className="text-sm text-gray-200 whitespace-pre-wrap break-words font-mono">
                {generatedPrompt}
              </pre>
            ) : (
              <p className="text-sm text-gray-500 italic">
                Add keyframes to generate your video prompt...
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={copyToClipboard}
              disabled={!generatedPrompt}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={downloadPrompt}
              disabled={!generatedPrompt}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download
            </button>
            <button
              onClick={saveToFavorites}
              disabled={timeline.keyframes.length === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                saved
                  ? 'bg-forge-purple text-white'
                  : 'bg-forge-purple/30 hover:bg-forge-purple/50 text-forge-purple disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {saved ? 'Saved!' : 'Save to Favorites'}
            </button>
          </div>
        </div>

        {/* Stats & Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Stats */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-forge-cyan">
                  {timeline.keyframes.filter(k => k.prompt.trim()).length}
                </div>
                <div className="text-xs text-gray-500">Keyframes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-forge-purple">
                  {Math.max(...timeline.keyframes.map(k => k.timestamp), 0) + 5}s
                </div>
                <div className="text-xs text-gray-500">Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{generatedPrompt.length}</div>
                <div className="text-xs text-gray-500">Chars</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
            <h3 className="font-medium mb-2">Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>- Start with a clear opening shot at 0s</li>
              <li>- Use 3-5 keyframes for best results</li>
              <li>- Add motion for dynamic scenes</li>
              <li>- Global style applies to all scenes</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need to build image prompts too?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/image-prompt-generator"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Image Prompt Generator
            </Link>
            <Link
              href="/templates"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Explore Memory Tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
