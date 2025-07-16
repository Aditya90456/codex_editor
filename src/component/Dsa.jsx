import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

function ResumeBuilder() {
  const [resume, setResume] = useState({
    name: '',
    email: '',
    phone: '',
    education: [],
    experience: [],
    skills: [],
    projects: []
  })

  useEffect(() => {
    axios.get('/api/resume')
      .then(res => {
        const data = res.data.data || {}
        setResume({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          education: data.education || [],
          experience: data.experience || [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          projects: data.projects || []
        })
      })
      .catch(err => console.error('Failed to load resume', err))
  }, [])

  const handleChange = (field, value) => {
    setResume(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">📄 Resume Builder</h1>
        <p className="text-gray-300 mt-2">Create & edit your professional resume</p>
      </header>

      <div className="max-w-4xl mx-auto bg-gray-900/70 rounded-2xl p-6 shadow-lg backdrop-blur">
        {/* Name and Contact */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Full Name</label>
          <input
            type="text"
            value={resume.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-lg font-semibold">Email</label>
            <input
              type="email"
              value={resume.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Phone</label>
            <input
              type="text"
              value={resume.phone}
              onChange={e => handleChange('phone', e.target.value)}
              placeholder="+91 12345 67890"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Skills</label>
          <input
            type="text"
            value={Array.isArray(resume.skills) ? resume.skills.join(', ') : ''}
            onChange={e =>
              handleChange('skills', e.target.value.split(',').map(s => s.trim()))
            }
            placeholder="e.g., React, Node.js, MongoDB"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Education */}
        <Section
          title="🎓 Education"
          items={resume.education}
          onChange={items => handleChange('education', items)}
          fields={['Degree', 'Institution', 'Year']}
        />

        {/* Experience */}
        <Section
          title="💼 Experience"
          items={resume.experience}
          onChange={items => handleChange('experience', items)}
          fields={['Position', 'Company', 'Duration']}
        />

        {/* Projects */}
        <Section
          title="🚀 Projects"
          items={resume.projects}
          onChange={items => handleChange('projects', items)}
          fields={['Title', 'Description', 'Link']}
        />

        {/* Save Button */}
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-green-500 rounded-xl text-lg font-semibold hover:bg-green-600 transition"
            onClick={() => {
              axios.post('/api/resume', resume)
                .then(() => alert('Resume saved successfully!'))
                .catch(err => alert('Failed to save resume'))
            }}
          >
            💾 Save Resume
          </motion.button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, items, onChange, fields }) {
  const addItem = () =>
    onChange([...items, Object.fromEntries(fields.map(f => [f.toLowerCase(), '']))])

  const updateItem = (index, field, value) => {
    const updated = [...items]
    updated[index][field.toLowerCase()] = value
    onChange(updated)
  }

  const removeItem = (index) => {
    const updated = [...items]
    updated.splice(index, 1)
    onChange(updated)
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {items && items.map((item, i) => (
        <div key={i} className="bg-gray-800 rounded p-4 mb-4">
          {fields.map(f => (
            <div key={f} className="mb-2">
              <label className="block mb-1 font-medium">{f}</label>
              <input
                type="text"
                value={item[f.toLowerCase()] || ''}
                onChange={e => updateItem(i, f, e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>
          ))}
          <button
            onClick={() => removeItem(i)}
            className="text-red-400 mt-2 hover:text-red-600"
          >
            ❌ Remove
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        ➕ Add {title.replace('🎓 ', '').replace('💼 ', '').replace('🚀 ', '').slice(0, -1)}
      </button>
    </div>
  )
}

export default ResumeBuilder
