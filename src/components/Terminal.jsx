import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal as TerminalIcon, Minimize2, Maximize2, X, User, Code, Briefcase, GraduationCap, Award, FileText, Mail, Home, Calendar, Folder, Eye, MessageSquare, Clock, EyeClosedIcon } from 'lucide-react';
import whoamiData from '../data/whoami.json';
import whoami from '../assets/whoiam1.jpg'

// Destructure data from JSON
const { personalInfo, strengths, interests, skills, projects, experience, education, achievements, research, contact, commands } = whoamiData;

// Command icons mapping
const commandIcons = {
  help: TerminalIcon,
  about: User,
  skills: Code,
  projects: Folder,
  experience: Briefcase,
  education: GraduationCap,
  achievements: Award,
  research: FileText,
  contact: Mail,
  clear: X,
  whoami: User,
  pwd: Home,
  date: Calendar,
  ls: Folder,
  cat: Eye,
  echo: MessageSquare,
  history: Clock
};

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [lastCommandId, setLastCommandId] = useState(null);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    // Show welcome message on load
    const welcomeOutput = {
      id: Date.now(),
      command: 'welcome',
      output: getWelcomeMessage(),
      timestamp: new Date(),
      type: 'info'
    };
    setHistory([welcomeOutput]);
    
    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Auto-scroll behavior when new output is added
    if (terminalBodyRef.current) {
      if (lastCommandId) {
        // If command was executed via button click, scroll to that specific command
        // Add a small delay to ensure DOM is updated
        setTimeout(() => {
          const commandElement = document.getElementById(`command-${lastCommandId}`);
          if (commandElement) {
            commandElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
            setLastCommandId(null); // Reset after scrolling
          }
        }, 100);
      } else {
        // Default behavior: scroll to bottom
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }
  }, [history, lastCommandId]);

  const getWelcomeMessage = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 bg-terminal-window rounded-lg border border-terminal-border">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-terminal-green shadow-lg">
              <img 
                src={whoami} 
                alt={`${personalInfo.name} - Profile Picture`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150x150/00ff41/000000?text=MM";
                }}
              />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-terminal-green text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
              {personalInfo.name}
            </div>
            <div className="text-terminal-blue text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3">
              {personalInfo.title}
            </div>
            <div className="text-terminal-gray space-y-1 text-xs sm:text-sm">
              <p>📍 {personalInfo.location}</p>
              <p className="break-all sm:break-normal">📧 {personalInfo.email}</p>
              <p>💻 {personalInfo.bio}</p>
            </div>
          </div>
        </div>
        
        {/* Welcome Message */}
        <div className="text-terminal-gray text-sm sm:text-base">
          <p className="text-base sm:text-lg mb-2">Welcome to my interactive terminal portfolio! 🚀</p>
          <p>Type <span className="text-terminal-green font-semibold">'help'</span> to see all available commands, or use the quick command bar above.</p>
          <p className="text-xs sm:text-sm text-terminal-gray mt-2">💡 Tip: Use arrow keys for command history, Tab for auto-completion</p>
        </div>
      </div>
    );
  };

  const executeCommand = (cmd, commandId = null) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const baseCommand = args[0];
    
    // Add to command history
    if (cmd.trim()) {
      setCommandHistory(prev => [...prev, cmd.trim()]);
    }
    
    // Add command to history
    const entryId = commandId || Date.now();
    const newEntry = {
      id: entryId,
      command: cmd,
      output: null,
      timestamp: new Date(),
      type: 'command'
    };

    let output;
    let outputType = 'info';

    switch (baseCommand) {
      case 'help':
        output = getHelpOutput();
        break;
      case 'about':
        output = getAboutOutput();
        break;
      case 'skills':
        output = getSkillsOutput();
        break;
      case 'projects':
        output = getProjectsOutput();
        break;
      case 'experience':
        output = getExperienceOutput();
        break;
      case 'education':
        output = getEducationOutput();
        break;
      case 'achievements':
        output = getAchievementsOutput();
        break;
      case 'research':
        output = getResearchOutput();
        break;
      case 'contact':
        output = getContactOutput();
        break;
      case 'clear':
        setHistory([]);
        setCurrentCommand('');
        return;
      case 'whoami':
        output = <div className="text-terminal-green">{personalInfo.name} - {personalInfo.title}</div>;
        break;
      case 'pwd':
        output = <div className="text-terminal-blue">/home/mozammil/portfolio</div>;
        break;
      case 'date':
        output = <div className="text-terminal-gray">{new Date().toString()}</div>;
        break;
      case 'ls':
        output = getLsOutput();
        break;
      case 'cat':
        if (args[1]) {
          output = getCatOutput(args[1]);
        } else {
          output = <div className="error">cat: missing file operand</div>;
          outputType = 'error';
        }
        break;
      case 'echo':
        output = <div className="text-white">{args.slice(1).join(' ')}</div>;
        break;
      case 'history':
        output = getHistoryOutput();
        break;
      case '':
        // Empty command, just show prompt
        setHistory(prev => [...prev, { ...newEntry, output: null }]);
        setCurrentCommand('');
        return;
      default:
        output = (
          <div className="error">
            Command '{baseCommand}' not found. Type 'help' to see available commands.
          </div>
        );
        outputType = 'error';
    }

    setHistory(prev => [...prev, { ...newEntry, output, type: outputType }]);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const getHelpOutput = () => (
    <div className="space-y-2">
      <div className="text-terminal-green font-semibold text-lg mb-4">Available Commands:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        {Object.entries(commands).map(([cmd, desc]) => (
          <div key={cmd} className="flex">
            <span className="text-terminal-green font-semibold w-18">{cmd}</span>
            <span className="text-terminal-gray ml-3">- {desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-terminal-blue text-sm">
        <p>💡 Tips:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Use arrow keys to navigate command history</li>
          <li>Type 'clear' to clear the terminal</li>
          <li>All commands are case-insensitive</li>
        </ul>
      </div>
    </div>
  );

  const getAboutOutput = () => (
    <div className="space-y-4">
      <div className="text-terminal-green text-xl font-semibold">About Me</div>
      <div className="space-y-3">
        <p>I'm a passionate Computer Science Engineering student at Dronacharya Group of Institutions with a strong foundation in web development and emerging technologies like blockchain and Web3.</p>
        
        <div className="bg-terminal-window p-4 rounded border border-terminal-border">
          <div className="text-terminal-blue font-semibold mb-2">Personal Details:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="text-terminal-orange">Name:</span> {personalInfo.name}</div>
            <div><span className="text-terminal-orange">Location:</span> {personalInfo.location}</div>
            <div><span className="text-terminal-orange">Phone:</span> {personalInfo.phone}</div>
            <div><span className="text-terminal-orange">Email:</span> {personalInfo.email}</div>
          </div>
        </div>

        <div>
          <div className="text-terminal-blue font-semibold mb-2">Personal Strengths:</div>
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength, index) => (
              <span key={index} className="bg-terminal-green text-terminal-bg px-2 py-1 rounded text-sm">
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-terminal-blue font-semibold mb-2">Interests & Hobbies:</div>
          <ul className="list-disc list-inside space-y-1 text-terminal-gray">
            {interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const getSkillsOutput = () => (
    <div className="space-y-4">
      <div className="text-terminal-green text-xl font-semibold">Technical Skills</div>
      {Object.entries(skills).map(([category, skillsData]) => (
        <div key={category} className="space-y-2">
          <div className="text-terminal-blue font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}:</div>
          <div className="pl-4">
            {Array.isArray(skillsData) ? (
              <div className="flex flex-wrap gap-2">
                {skillsData.map((skill, index) => (
                  <span key={index} className="bg-terminal-blue bg-opacity-20 px-2 py-1 rounded text-sm border border-terminal-blue text-black hover:text-white hover:bg-terminal-blue hover:bg-opacity-80 transition-all duration-200 cursor-pointer">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              Object.entries(skillsData).map(([skill, level]) => (
                <div key={skill} className="flex items-center gap-3 mb-2">
                  <span className="w-24 text-sm">{skill}</span>
                  <div className="flex-1 bg-terminal-border h-2 rounded overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-terminal-green to-terminal-blue"
                      initial={{ width: 0 }}
                      animate={{ width: `${level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-terminal-gray text-sm w-12">{level}%</span>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const getProjectsOutput = () => (
    <div className="space-y-6">
      <div className="text-terminal-green text-xl font-semibold">Featured Projects</div>
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-terminal-window p-4 rounded border border-terminal-border"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-terminal-blue font-semibold text-lg">{project.name}</div>
            <div className="flex gap-2">
              {project.links.live && (
                project.links.live.startsWith('http') ? (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline text-sm">Live</a>
                ) : (
                  <Link to={project.links.live} className="text-terminal-green hover:underline text-sm">Live</Link>
                )
              )}
              {project.links.github && (
                project.links.github.startsWith('http') ? (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline text-sm">GitHub</a>
                ) : (
                  <Link to={project.links.github} className="text-terminal-green hover:underline text-sm">GitHub</Link>
                )
              )}
            </div>
          </div>
          <p className="text-terminal-gray mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="bg-terminal-orange bg-opacity-20 text-black px-2 py-1 rounded text-sm">
                {tech}
              </span>
            ))}
          </div>
          {project.features && (
            <div>
              <div className="text-terminal-blue font-semibold mb-1">Key Features:</div>
              <ul className="list-disc list-inside text-terminal-gray text-sm space-y-1">
                {project.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const getExperienceOutput = () => (
    <div className="space-y-4">
      <div className="text-terminal-green text-xl font-semibold">Professional Experience</div>
      {experience.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-terminal-window p-4 rounded border border-terminal-border"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-terminal-blue font-semibold text-lg">{exp.position}</div>
              <div className="text-terminal-green">{exp.company}</div>
            </div>
            <div className="text-right text-terminal-gray text-sm">
              <div>{exp.location}</div>
              <div className="text-terminal-orange">{exp.duration}</div>
            </div>
          </div>
          <ul className="list-disc list-inside text-terminal-gray space-y-1">
            {exp.responsibilities.map((resp, respIndex) => (
              <li key={respIndex}>{resp}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-3">
            {exp.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="bg-terminal-green bg-opacity-20 text-black hover:bg-terminal-green hover:bg-opacity-80 transition-all duration-200 cursor-pointer px-2 py-1 rounded text-sm">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const getEducationOutput = () => (
    <div className="space-y-4">
      <div className="text-terminal-green text-xl font-semibold">Educational Background</div>
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-terminal-window p-4 rounded border border-terminal-border"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-terminal-blue font-semibold text-lg">{edu.degree}</div>
              <div className="text-terminal-green">{edu.institution}</div>
              <div className="text-terminal-gray">{edu.field}</div>
            </div>
            <div className="text-right text-terminal-gray text-sm">
              <div>{edu.location}</div>
              <div className="text-terminal-orange">{edu.duration}</div>
              <div className="text-terminal-blue font-semibold">{edu.grade}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const getAchievementsOutput = () => (
    <div className="space-y-4">
      <div className="text-terminal-green text-xl font-semibold">Achievements & Milestones</div>
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-start gap-4 bg-terminal-window p-4 rounded border border-terminal-border"
        >
          <div className="text-2xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="text-terminal-blue font-semibold text-lg">{achievement.title}</div>
            <p className="text-terminal-gray mb-2">{achievement.description}</p>
            <div className="flex flex-wrap gap-2">
              {achievement.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="bg-terminal-green bg-opacity-20 text-black  hover:bg-terminal-green hover:bg-opacity-80 transition-all duration-200  px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const getResearchOutput = () => (
    <div className="space-y-4">
      <div className="text-terminal-green text-xl font-semibold">Research Publications</div>
      {research.map((paper, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-terminal-window p-4 rounded border border-terminal-border"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-terminal-blue font-semibold text-lg">{paper.title}</div>
            <span className="bg-terminal-green text-terminal-bg px-2 py-1 rounded text-sm">Published</span>
          </div>
          <div className="text-terminal-green mb-3">Published in: {paper.journal}</div>
          <div className="mb-3">
            <div className="text-terminal-orange font-semibold mb-1">Abstract:</div>
            <p className="text-terminal-gray">{paper.abstract}</p>
          </div>
          <div>
            <div className="text-terminal-orange font-semibold mb-1">Key Contributions:</div>
            <ul className="list-disc list-inside text-terminal-gray space-y-1">
              {paper.contributions.map((contribution, contribIndex) => (
                <li key={contribIndex}>{contribution}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const getContactOutput = () => (
    <div className="space-y-4">
      <div className="text-terminal-green text-xl font-semibold">Get In Touch</div>
      <p className="text-terminal-gray">I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contact.map((contactItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 bg-terminal-window p-3 rounded border border-terminal-border hover:border-terminal-green transition-colors"
          >
            <div className="text-terminal-green text-xl">{contactItem.icon}</div>
            <div>
              <div className="text-terminal-blue font-semibold">{contactItem.type}</div>
              {contactItem.link ? (
                contactItem.link.startsWith('http') || contactItem.link.startsWith('mailto:') || contactItem.link.startsWith('tel:') ? (
                  <a href={contactItem.link} target="_blank" rel="noopener noreferrer" className="text-terminal-gray hover:text-terminal-green transition-colors">
                    {contactItem.value}
                  </a>
                ) : (
                  <Link to={contactItem.link} className="text-terminal-gray hover:text-terminal-green transition-colors">
                    {contactItem.value}
                  </Link>
                )
              ) : (
                <div className="text-terminal-gray">{contactItem.value}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const getLsOutput = () => (
    <div className="grid grid-cols-3 gap-4 text-terminal-green">
      <div>about.txt</div>
      <div>projects/</div>
      <div>skills.json</div>
      <div>experience.log</div>
      <div>education.txt</div>
      <div>achievements.md</div>
      <div>research/</div>
      <div>contact.txt</div>
      <div>README.md</div>
    </div>
  );

  const getCatOutput = (filename) => {
    const fileMap = {
      'about.txt': getAboutOutput(),
      'skills.json': getSkillsOutput(),
      'experience.log': getExperienceOutput(),
      'education.txt': getEducationOutput(),
      'achievements.md': getAchievementsOutput(),
      'contact.txt': getContactOutput(),
      'readme.md': (
        <div className="text-terminal-gray">
          <h2 className="text-terminal-green text-lg font-semibold mb-2">MD Mozammil - Portfolio Terminal</h2>
          <p>An interactive terminal-based portfolio showcasing my skills, projects, and experience.</p>
          <p className="mt-2">Type 'help' to see all available commands.</p>
        </div>
      )
    };

    return fileMap[filename.toLowerCase()] || (
      <div className="error">cat: {filename}: No such file or directory</div>
    );
  };

  const getHistoryOutput = () => (
    <div className="space-y-1">
      {commandHistory.map((cmd, index) => (
        <div key={index} className="text-terminal-gray">
          <span className="text-terminal-blue w-8 inline-block">{index + 1}</span>
          {cmd}
        </div>
      ))}
    </div>
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete functionality
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(currentCommand.toLowerCase())
      );
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleQuickCommand = (command) => {
    const commandId = Date.now();
    setLastCommandId(commandId);
    setCurrentCommand(command);
    executeCommand(command, commandId);
    setCurrentCommand('');
  };

  // Sticky Command Bar Component
const StickyCommandBar = () => {
  const mainCommands = ['help', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'research', 'contact', 'clear', 'whoami', 'pwd', 'date', 'ls', 'cat', 'history'];

  return (
    <div className="sticky top-0 z-10 bg-terminal-window border-b border-terminal-border p-2 sm:p-3">
      {/* Mobile: Show fewer commands in first row, rest in collapsible */}
      <div className="block sm:hidden">
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {mainCommands.slice(0, 8).map((cmd) => {
            const IconComponent = commandIcons[cmd] || TerminalIcon;
            return (
              <motion.button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="flex items-center cursor-pointer gap-1 px-2 py-1.5 bg-terminal-bg border border-terminal-border rounded text-xs hover:border-terminal-green hover:bg-terminal-green hover:bg-opacity-10 transition-all duration-200 group min-w-0 text-terminal-gray hover:text-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent size={12} className="flex-shrink-0" />
                <span className="font-mono truncate">
                  {cmd}
                </span>
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {mainCommands.slice(8).map((cmd) => {
            const IconComponent = commandIcons[cmd] || TerminalIcon;
            return (
              <motion.button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="flex cursor-pointer items-center gap-1 px-2 py-1.5 bg-terminal-bg border border-terminal-border rounded text-xs hover:border-terminal-green hover:bg-terminal-green hover:bg-opacity-10 transition-all duration-200 group min-w-0 text-terminal-gray hover:text-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent size={12} className="flex-shrink-0" />
                <span className="font-mono truncate">
                  {cmd}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tablet and Desktop: Show all commands in rows */}
      <div className="hidden sm:block">
        <div className="flex flex-wrap gap-2 justify-center">
          {mainCommands.map((cmd) => {
            const IconComponent = commandIcons[cmd] || TerminalIcon;
            return (
              <motion.button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="flex cursor-pointer items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-terminal-bg border border-terminal-border rounded-md hover:border-terminal-green hover:bg-terminal-green hover:bg-opacity-10 transition-all duration-200 group text-terminal-gray hover:text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={14} className="sm:size-4" />
                <span className="text-xs sm:text-sm font-mono">
                  {cmd}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-2">
        <span className="text-terminal-gray text-xs sm:text-sm">
          💡 <span className="hidden sm:inline">Quick Commands - Click any button above or type commands below</span>
          <span className="sm:hidden">Tap commands or type below</span>
        </span>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: isMaximized ? 1.02 : 1,
          width: isMaximized ? '98vw' : 'auto',
          height: isMaximized ? '98vh' : 'auto'
        }}
        transition={{ duration: 0.3 }}
        className={`terminal-window w-full max-w-7xl mx-auto ${isMinimized ? 'h-16' : ''} ${isMaximized ? 'max-w-none' : ''}`}
      >
        {/* Terminal Header */}
        <div className="terminal-header p-3 sm:p-4">
          <div className="terminal-controls">
            <div 
              className="terminal-control close w-3.5 h-3.5 sm:w-3 sm:h-3"
              onClick={() => window.close()}
            />
            <div 
              className="terminal-control minimize w-3.5 h-3.5 sm:w-3 sm:h-3"
              onClick={() => setIsMinimized(!isMinimized)}
            />
            <div 
              className="terminal-control maximize w-3.5 h-3.5 sm:w-3 sm:h-3"
              onClick={() => setIsMaximized(!isMaximized)}
            />
          </div>
          <div className="terminal-title text-xs sm:text-sm truncate">
            <span className="hidden sm:inline">mozammil@portfolio:~$</span>
            <span className="sm:hidden">terminal</span>
          </div>
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} className="text-terminal-green sm:size-4" />
          </div>
        </div>

        {/* Sticky Command Bar */}
        {!isMinimized && <StickyCommandBar />}

        {/* Terminal Body */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="terminal-body overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] p-3 sm:p-4 md:p-6"
              ref={terminalBodyRef}
              onClick={handleTerminalClick}
            >
              {/* Command History */}
              <div className="space-y-2">
                {history.map((entry) => (
                  <motion.div
                    key={entry.id}
                    id={`command-${entry.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    {entry.command && (
                      <div className="command-line">
                        <span className="prompt">mozammil@portfolio:~$</span>
                        <span className="text-white">{entry.command}</span>
                      </div>
                    )}
                    {entry.output && (
                      <div className={`output ${entry.type}`}>
                        {entry.output}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Current Command Input */}
              <div className="command-line mt-4 flex-wrap sm:flex-nowrap">
                <span className="prompt text-xs sm:text-sm flex-shrink-0">
                  <span className="hidden sm:inline">mozammil@portfolio:~$</span>
                  <span className="sm:hidden">$</span>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="command-input text-xs sm:text-sm min-w-0"
                  placeholder="Type a command..."
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Terminal;
