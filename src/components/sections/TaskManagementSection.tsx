import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Input from '../ui/Input';
import Button from '../ui/Button';
import TaskItem from '../ui/TaskItem';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TaskManagementSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const taskListRef = useRef<HTMLUListElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Initial animation for the section coming into view
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      });

      // Animate cards on scroll-in (staggered)
      const taskCards = gsap.utils.toArray<HTMLElement>('.task-item-card');
      gsap.from(taskCards, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: taskListRef.current,
          start: 'top bottom-=50',
          end: 'bottom top+=50',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [tasks]); // Re-run effect when tasks change to re-evaluate ScrollTrigger

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newId = `task-${Date.now()}`;
      const newTask: Task = { id: newId, text: newTaskText, completed: false };

      // Use FLIP for smooth addition animation
      const state = Flip.getState(taskListRef.current?.children);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskText('');

      gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } })
        .add(() => {
          // Find the newly added item and animate it
          const newItem = taskListRef.current?.querySelector(`[data-id="${newId}"]`);
          if (newItem) {
            gsap.from(newItem, { opacity: 0, y: 30, scale: 0.9, duration: 0.6 });
          }
        }, "+=0.1"); // Small delay to allow React to render

      Flip.from(state, {
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.05,
        targets: '.task-item-card', // Only animate existing items if they move
        absolute: true,
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.6 }),
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    const state = Flip.getState(taskListRef.current?.children);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      stagger: 0.05,
      absolute: true, // Crucial for FLIP when elements re-order or move
    });
  };

  const handleDeleteTask = (id: string) => {
    const state = Flip.getState(taskListRef.current?.children);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      stagger: 0.05,
      absolute: true, // Crucial for FLIP when elements re-order or move
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.6 }),
    });
  };

  return (
    <section ref={sectionRef} className="min-h-screen py-16 px-4 md:px-8 flex flex-col justify-center items-center relative z-10 bg-gradient-to-tl from-deep-black via-dark-gray to-light-gray overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-space text-hero-md md:text-hero-lg font-bold text-center text-off-white mb-16 leading-tight">
          Your Daily <span className="text-neon-cyan">Taskflow</span>
        </h2>

        {/* Task Input Area - Asymmetrical layout */}
        <div className="relative z-10 bg-dark-gray p-8 rounded-2xl shadow-neon border border-light-gray mb-16
                        grid grid-cols-1 md:grid-cols-3 gap-6 items-center
                        transform perspective-[1000px] rotateX-3 translateZ-20"> {/* Pseudo-3D effect */}
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="What's next on your quantum journey?"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              className="input-primary"
            />
          </div>
          <div className="md:col-span-1 flex justify-end">
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
          {/* Abstract elements for depth */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-20 h-20 bg-neon-magenta rounded-full mix-blend-screen opacity-10 -top-10 -right-10 blur-xl"></div>
            <div className="absolute w-32 h-32 bg-neon-green rounded-full mix-blend-screen opacity-10 -bottom-10 -left-10 blur-xl"></div>
          </div>
        </div>

        {/* Task List */}
        <ul ref={taskListRef} className="space-y-6">
          {tasks.length === 0 ? (
            <li className="text-center text-light-gray text-xl py-10 opacity-70">
              No tasks yet. Let's add some!
            </li>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </ul>
      </div>

      {/* Abstract diagonal element for section transition visual break */}
      <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-r from-transparent to-deep-black opacity-30 -rotate-2 transform origin-bottom-left translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-full h-1/5 bg-gradient-to-l from-transparent to-deep-black opacity-30 rotate-2 transform origin-top-right -translate-y-1/2"></div>
    </section>
  );
};

export default TaskManagementSection;