import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TaskItemProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      // Initial stagger animation when new tasks are added (handled by parent FLIP context)
      // We focus on hover effects here.

      // Hover animation for the whole item
      gsap.to(itemRef.current, {
        scale: 1.02,
        x: 10, // Slight horizontal shift
        boxShadow: '0 0 25px rgba(0,255,255,0.5)',
        duration: 0.2,
        ease: 'power2.out',
        paused: true,
        onReverseComplete: () => {
          gsap.set(itemRef.current, { clearProps: 'all' }); // Clean up properties after hover
        }
      }).revert(); // Ensure it reverts to initial state

      itemRef.current.addEventListener('mouseenter', () => {
        gsap.to(itemRef.current, {
          scale: 1.02,
          x: 10,
          boxShadow: '0 0 25px rgba(0,255,255,0.5)',
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      itemRef.current.addEventListener('mouseleave', () => {
        gsap.to(itemRef.current, {
          scale: 1,
          x: 0,
          boxShadow: '0 0 15px rgba(0,0,0,0.5)',
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      // Checkbox animation
      gsap.to(checkRef.current, {
        backgroundColor: task.completed ? '#00FFFF' : '#1A1A1A',
        borderColor: task.completed ? '#00FFFF' : '#F0F0F0',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Delete button hover
      gsap.to(deleteRef.current, {
        scale: 1.1,
        color: '#FF00FF', // Magenta
        duration: 0.2,
        ease: 'power2.out',
        paused: true,
      }).revert();

      deleteRef.current.addEventListener('mouseenter', () => {
        gsap.to(deleteRef.current, { scale: 1.1, color: '#FF00FF', duration: 0.2 });
      });
      deleteRef.current.addEventListener('mouseleave', () => {
        gsap.to(deleteRef.current, { scale: 1, color: '#F0F0F0', duration: 0.2 });
      });

    }, itemRef); // Scope for GSAP context

    return () => ctx.revert(); // Cleanup GSAP animations
  }, [task.completed]); // Re-run effect when task.completed changes

  return (
    <li
      ref={itemRef}
      data-id={task.id}
      className={`task-item-card relative bg-dark-gray p-6 rounded-xl shadow-subtle-neumorphic border border-light-gray
                  flex items-center justify-between transition-all duration-300 ease-custom-bezier
                  ${task.completed ? 'opacity-50 line-through' : ''}`}
      style={{ willChange: 'transform, box-shadow, opacity' }}
    >
      <div className="flex items-center flex-grow cursor-pointer" onClick={() => onToggleComplete(task.id)}>
        <div
          ref={checkRef}
          className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center
                      ${task.completed ? 'bg-neon-cyan border-neon-cyan' : 'bg-dark-gray border-light-gray'}`}
          style={{ willChange: 'background-color, border-color' }}
        >
          {task.completed && (
            <svg className="w-4 h-4 text-deep-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <p className="text-xl font-poppins flex-grow break-words">
          {task.text}
        </p>
      </div>

      <button
        ref={deleteRef}
        onClick={() => onDelete(task.id)}
        className="ml-4 p-2 rounded-full text-off-white hover:bg-light-gray transition-colors duration-200"
        style={{ willChange: 'transform, color' }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
};

export default TaskItem;