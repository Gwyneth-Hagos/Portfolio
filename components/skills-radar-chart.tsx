'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomTooltip } from '@/components/custom-tooltip';
import { RadarBackground } from '@/components/radar-background';

interface SkillData {
  subject: string;
  value: number;
  fullMark: number;
}

interface SkillsRadarChartProps {
  className?: string;
}

export function SkillsRadarChart({ className = '' }: SkillsRadarChartProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [animatedValues, setAnimatedValues] = useState<SkillData[]>([]);
  const [transitioningValues, setTransitioningValues] = useState<SkillData[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const skillData: SkillData[] = [
    { subject: 'React.js', value: 80, fullMark: 100 },
    { subject: 'TypeScript', value: 75, fullMark: 100 },
    { subject: 'JavaScript', value: 78, fullMark: 100 },
    { subject: 'HTML', value: 85, fullMark: 100 },
    { subject: 'CSS', value: 82, fullMark: 100 },
    { subject: 'TailwindCSS', value: 85, fullMark: 100 },
    { subject: 'Bootstrap', value: 70, fullMark: 100 },
    { subject: 'jQuery', value: 65, fullMark: 100 },
    { subject: 'Node.js', value: 68, fullMark: 100 },
    { subject: 'React Native', value: 72, fullMark: 100 },
    { subject: 'Expo Go', value: 70, fullMark: 100 },
    { subject: 'Android Studio', value: 60, fullMark: 100 },
    { subject: 'PHP', value: 55, fullMark: 100 },
    { subject: 'Firebase', value: 70, fullMark: 100 },
    { subject: 'Vite', value: 75, fullMark: 100 },
    { subject: 'Figma', value: 85, fullMark: 100 },
  ];

  // Group skills into categories for better visualization
  const frontendSkills = skillData.filter(skill => 
    ['React.js', 'HTML', 'CSS', 'TailwindCSS', 'Bootstrap', 'jQuery'].includes(skill.subject)
  );
  
  const backendSkills = skillData.filter(skill => 
    ['Node.js', 'PHP', 'Firebase'].includes(skill.subject)
  );
  
  const mobileSkills = skillData.filter(skill => 
    ['React Native', 'Expo Go', 'Android Studio'].includes(skill.subject)
  );
  
  const languageSkills = skillData.filter(skill => 
    ['JavaScript', 'TypeScript'].includes(skill.subject)
  );
  
  const toolsSkills = skillData.filter(skill => 
    ['Vite', 'Figma'].includes(skill.subject)
  );

  // Initialize animated values with zero
  useEffect(() => {
    setAnimatedValues(skillData.map(item => ({ ...item, value: 0 })));
  }, []);

  // Animate values when visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedValues(getSkillsForCategory(activeCategory));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Get skills for a specific category
  const getSkillsForCategory = (category: string) => {
    switch(category) {
      case 'frontend': return frontendSkills;
      case 'backend': return backendSkills;
      case 'mobile': return mobileSkills;
      case 'languages': return languageSkills;
      case 'tools': return toolsSkills;
      default: return skillData;
    }
  };

  // Handle category change with smooth transition
  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;
    
    setIsTransitioning(true);
    
    // Start with current values
    const currentValues = [...animatedValues];
    const targetValues = getSkillsForCategory(category);
    
    // Create a map of current values for easy lookup
    const currentValuesMap = new Map(
      currentValues.map(item => [item.subject, item.value])
    );
    
    // Create transition values - start with current values for existing skills
    // and zero for new skills
    const initialTransitionValues = targetValues.map(item => ({
      ...item,
      value: currentValuesMap.get(item.subject) || 0
    }));
    
    setTransitioningValues(initialTransitionValues);
    
    // Animate to target values
    setTimeout(() => {
      setTransitioningValues(targetValues);
      
      // After animation completes, update the actual values
      setTimeout(() => {
        setAnimatedValues(targetValues);
        setActiveCategory(category);
        setIsTransitioning(false);
      }, 600); // Match this with the animation duration
    }, 50);
  };

  const handleMouseEnter = (data: any) => {
    setHoveredSkill(data.subject);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const chartVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setIsVisible(true)}
    >
      {/* Category selector */}
      <motion.div className="mb-4 flex flex-wrap gap-2" variants={itemVariants}>
        {[
          { id: 'all', label: 'All Skills' },
          { id: 'frontend', label: 'Frontend' },
          { id: 'backend', label: 'Backend' },
          { id: 'mobile', label: 'Mobile' },
          { id: 'languages', label: 'Languages' },
          { id: 'tools', label: 'Tools' }
        ].map(category => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`rounded-full px-3 py-1 text-xs transition-all ${
              activeCategory === category.id 
                ? 'bg-primary text-white' 
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>
      
      <motion.div 
        className="h-[350px] relative"
        variants={chartVariants}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <RadarBackground />
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={isTransitioning ? transitioningValues : animatedValues}>
            <PolarGrid stroke="rgba(236, 72, 153, 0.2)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ 
                fill: hoveredSkill ? 'rgba(255, 255, 255, 0.5)' : '#fff',
                fontSize: 11
              }}
              tickLine={false}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false}
              axisLine={false}
              stroke="rgba(236, 72, 153, 0.2)"
            />
            <Radar 
              name="Skills" 
              dataKey="value" 
              stroke="#ec4899" 
              fill="#ec4899" 
              fillOpacity={0.5}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            />
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ transition: 'all 0.3s ease' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div className="mt-4 text-center" variants={itemVariants}>
        <p className="text-sm text-muted-foreground">
          Hover over the chart to see skill proficiency levels
        </p>
      </motion.div>
    </motion.div>
  );
}