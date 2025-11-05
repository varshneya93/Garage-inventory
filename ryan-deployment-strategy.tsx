import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';

const DeploymentStrategy = () => {
  const [expandedPhases, setExpandedPhases] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const deploymentPhases = [
    {
      id: 'phase1',
      title: 'Phase 1: Analysis & Planning',
      duration: '1-2 days',
      priority: 'Critical',
      tasks: [
        {
          id: 'p1-t1',
          title: 'Deep Analysis of Ryan Template',
          subtasks: [
            'Map all sections and components',
            'Document animation triggers and effects',
            'Analyze Webflow interactions and timing',
            'List all dynamic behaviors',
            'Identify all image/media assets',
            'Document responsive breakpoints'
          ]
        },
        {
          id: 'p1-t2',
          title: 'Technical Stack Selection',
          subtasks: [
            'Choose between vanilla JS vs React framework',
            'Select animation library (GSAP recommended)',
            'Choose deployment platform (Vercel/Netlify)',
            'Plan asset hosting strategy'
          ]
        },
        {
          id: 'p1-t3',
          title: 'Project Structure Setup',
          subtasks: [
            'Initialize Git repository',
            'Set up development environment',
            'Create folder structure',
            'Configure build tools'
          ]
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Core Structure Development',
      duration: '2-3 days',
      priority: 'Critical',
      tasks: [
        {
          id: 'p2-t1',
          title: 'HTML Structure',
          subtasks: [
            'Build semantic HTML structure',
            'Implement navigation system',
            'Create hero section markup',
            'Build about section',
            'Structure work portfolio grid',
            'Create testimonial slider markup',
            'Build services section',
            'Implement CTA section',
            'Create footer structure'
          ]
        },
        {
          id: 'p2-t2',
          title: 'CSS Foundation',
          subtasks: [
            'Set up CSS variables/custom properties',
            'Implement reset and base styles',
            'Create responsive grid system',
            'Build typography system',
            'Establish color palette',
            'Create spacing utilities'
          ]
        }
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Styling & Visual Design',
      duration: '3-4 days',
      priority: 'Critical',
      tasks: [
        {
          id: 'p3-t1',
          title: 'Component Styling',
          subtasks: [
            'Style navigation and logo',
            'Design hero section with image effects',
            'Create scrolling text animation styles',
            'Style statistics counters',
            'Design work portfolio cards',
            'Style testimonial slider',
            'Create service card designs',
            'Design CTA banner',
            'Style footer components'
          ]
        },
        {
          id: 'p3-t2',
          title: 'Responsive Design',
          subtasks: [
            'Implement mobile-first breakpoints',
            'Test tablet layouts (768px-1024px)',
            'Optimize desktop layouts (1024px+)',
            'Test ultra-wide displays (1400px+)',
            'Ensure mobile menu functionality'
          ]
        },
        {
          id: 'p3-t3',
          title: 'Visual Polish',
          subtasks: [
            'Add hover effects and transitions',
            'Implement box shadows',
            'Add gradient overlays',
            'Create image hover effects',
            'Fine-tune spacing and alignment'
          ]
        }
      ]
    },
    {
      id: 'phase4',
      title: 'Phase 4: Animations & Interactions',
      duration: '3-4 days',
      priority: 'High',
      tasks: [
        {
          id: 'p4-t1',
          title: 'GSAP ScrollTrigger Setup',
          subtasks: [
            'Install and configure GSAP',
            'Set up ScrollTrigger plugin',
            'Create scroll-based fade-ins',
            'Implement parallax effects',
            'Add stagger animations for grids'
          ]
        },
        {
          id: 'p4-t2',
          title: 'Hero Animations',
          subtasks: [
            'Animate title entrance',
            'Create hero image reveal',
            'Implement scroll indicator',
            'Add rotating image effect'
          ]
        },
        {
          id: 'p4-t3',
          title: 'Section Animations',
          subtasks: [
            'Create scrolling text marquee',
            'Animate statistics counters',
            'Add work item hover effects',
            'Implement testimonial auto-rotation',
            'Create service card reveals',
            'Add CTA text animation'
          ]
        },
        {
          id: 'p4-t4',
          title: 'Micro-interactions',
          subtasks: [
            'Button hover animations',
            'Nav link effects',
            'Social icon interactions',
            'Form input focus states',
            'Smooth scroll behavior'
          ]
        }
      ]
    },
    {
      id: 'phase5',
      title: 'Phase 5: Dynamic Features',
      duration: '2-3 days',
      priority: 'High',
      tasks: [
        {
          id: 'p5-t1',
          title: 'JavaScript Functionality',
          subtasks: [
            'Implement smooth scrolling',
            'Create active nav highlighting',
            'Build testimonial slider logic',
            'Add counter animation logic',
            'Create intersection observers',
            'Implement form validation'
          ]
        },
        {
          id: 'p5-t2',
          title: 'Work Portfolio System',
          subtasks: [
            'Create filterable portfolio grid',
            'Implement modal/lightbox for projects',
            'Add project detail pages',
            'Create navigation between projects'
          ]
        }
      ]
    },
    {
      id: 'phase6',
      title: 'Phase 6: Content & Assets',
      duration: '2 days',
      priority: 'Medium',
      tasks: [
        {
          id: 'p6-t1',
          title: 'Image Optimization',
          subtasks: [
            'Download/replace all images',
            'Optimize images (WebP format)',
            'Create responsive image sets',
            'Implement lazy loading',
            'Add placeholder loading states'
          ]
        },
        {
          id: 'p6-t2',
          title: 'Content Integration',
          subtasks: [
            'Replace placeholder text',
            'Add meta descriptions',
            'Create favicon and app icons',
            'Add Open Graph images',
            'Implement structured data'
          ]
        }
      ]
    },
    {
      id: 'phase7',
      title: 'Phase 7: Testing & Optimization',
      duration: '2-3 days',
      priority: 'Critical',
      tasks: [
        {
          id: 'p7-t1',
          title: 'Cross-Browser Testing',
          subtasks: [
            'Test on Chrome, Firefox, Safari, Edge',
            'Check mobile browsers (iOS Safari, Chrome)',
            'Fix browser-specific issues',
            'Ensure fallbacks for older browsers'
          ]
        },
        {
          id: 'p7-t2',
          title: 'Performance Optimization',
          subtasks: [
            'Minimize CSS and JavaScript',
            'Optimize image loading',
            'Implement code splitting',
            'Add caching headers',
            'Test page load speed (aim for <3s)',
            'Achieve 90+ Lighthouse score'
          ]
        },
        {
          id: 'p7-t3',
          title: 'Accessibility Testing',
          subtasks: [
            'Check keyboard navigation',
            'Test screen reader compatibility',
            'Ensure proper heading hierarchy',
            'Add ARIA labels where needed',
            'Check color contrast ratios',
            'Test with WAVE tool'
          ]
        },
        {
          id: 'p7-t4',
          title: 'Responsive Testing',
          subtasks: [
            'Test on various devices',
            'Check all breakpoints',
            'Test portrait and landscape',
            'Verify touch interactions',
            'Test on actual devices'
          ]
        }
      ]
    },
    {
      id: 'phase8',
      title: 'Phase 8: Deployment',
      duration: '1 day',
      priority: 'Critical',
      tasks: [
        {
          id: 'p8-t1',
          title: 'Pre-Deployment Checklist',
          subtasks: [
            'Remove console.logs',
            'Check all links work',
            'Verify form submissions',
            'Test analytics integration',
            'Configure environment variables',
            'Set up error tracking (Sentry)'
          ]
        },
        {
          id: 'p8-t2',
          title: 'Deployment Setup',
          subtasks: [
            'Choose hosting (Vercel/Netlify/GitHub Pages)',
            'Configure custom domain',
            'Set up SSL certificate',
            'Configure CDN for assets',
            'Set up automated deployments',
            'Create staging environment'
          ]
        },
        {
          id: 'p8-t3',
          title: 'Launch',
          subtasks: [
            'Deploy to staging',
            'Final testing on staging',
            'Deploy to production',
            'Monitor for errors',
            'Submit to search engines',
            'Set up monitoring/analytics'
          ]
        }
      ]
    },
    {
      id: 'phase9',
      title: 'Phase 9: Post-Launch',
      duration: 'Ongoing',
      priority: 'Medium',
      tasks: [
        {
          id: 'p9-t1',
          title: 'Monitoring & Maintenance',
          subtasks: [
            'Monitor analytics',
            'Check error logs',
            'Gather user feedback',
            'Fix reported issues',
            'Update content regularly',
            'Keep dependencies updated'
          ]
        },
        {
          id: 'p9-t2',
          title: 'SEO Optimization',
          subtasks: [
            'Submit sitemap to search engines',
            'Optimize meta tags',
            'Improve page speed',
            'Build backlinks',
            'Monitor search rankings'
          ]
        }
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateProgress = (phaseId) => {
    const phase = deploymentPhases.find(p => p.id === phaseId);
    if (!phase) return 0;
    
    const allTasks = phase.tasks.flatMap(task => 
      task.subtasks.map((_, idx) => `${task.id}-s${idx}`)
    );
    const completed = allTasks.filter(taskId => completedTasks[taskId]).length;
    return Math.round((completed / allTasks.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Ryan Template Deployment Strategy
          </h1>
          <p className="text-gray-600 mb-6">
            Complete roadmap for replicating the Ryan Webflow template with pixel-perfect accuracy
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium mb-1">Total Duration</div>
              <div className="text-2xl font-bold text-blue-900">18-25 days</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium mb-1">Total Phases</div>
              <div className="text-2xl font-bold text-green-900">9 phases</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium mb-1">Total Tasks</div>
              <div className="text-2xl font-bold text-purple-900">
                {deploymentPhases.reduce((acc, phase) => acc + phase.tasks.length, 0)}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800 mb-1">Important Notes</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Focus on pixel-perfect replication of design and animations</li>
                  <li>• Use GSAP for animations to match Webflow's smoothness</li>
                  <li>• Test on actual devices, not just browser DevTools</li>
                  <li>• Optimize for performance - target 90+ Lighthouse score</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {deploymentPhases.map((phase) => {
            const isExpanded = expandedPhases[phase.id];
            const progress = calculateProgress(phase.id);

            return (
              <div key={phase.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <div className="text-left flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {phase.title}
                      </h2>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">⏱️ {phase.duration}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(phase.priority)}`}>
                          {phase.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{progress}%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <div className="space-y-6">
                      {phase.tasks.map((task) => (
                        <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm">
                          <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                            {task.title}
                          </h3>
                          <div className="space-y-2">
                            {task.subtasks.map((subtask, idx) => {
                              const subtaskId = `${task.id}-s${idx}`;
                              const isCompleted = completedTasks[subtaskId];

                              return (
                                <button
                                  key={subtaskId}
                                  onClick={() => toggleTask(subtaskId)}
                                  className="w-full flex items-start gap-3 p-2 rounded hover:bg-gray-50 transition-colors text-left group"
                                >
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-0.5" />
                                  )}
                                  <span className={`text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                    {subtask}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Core Technologies</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ <strong>HTML5</strong> - Semantic markup</li>
                <li>✓ <strong>CSS3</strong> - Custom properties, Grid, Flexbox</li>
                <li>✓ <strong>JavaScript ES6+</strong> - Modern JS features</li>
                <li>✓ <strong>GSAP</strong> - Professional animations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tools & Deployment</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ <strong>Vercel/Netlify</strong> - Fast deployment</li>
                <li>✓ <strong>Git/GitHub</strong> - Version control</li>
                <li>✓ <strong>VS Code</strong> - Development environment</li>
                <li>✓ <strong>Lighthouse</strong> - Performance testing</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mt-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help Getting Started?</h2>
          <p className="text-blue-100 mb-4">
            I can help you with any phase of this deployment strategy. Let me know which area you'd like to focus on first!
          </p>
          <ul className="text-blue-100 space-y-2">
            <li>• Generate complete HTML/CSS/JS starter files</li>
            <li>• Create specific animation implementations</li>
            <li>• Set up deployment configurations</li>
            <li>• Debug specific issues as they arise</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeploymentStrategy;