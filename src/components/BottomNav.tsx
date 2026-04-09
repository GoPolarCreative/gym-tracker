import { NavLink } from 'react-router-dom'
import { Dumbbell, CalendarDays, BarChart2 } from 'lucide-react'

const tabs = [
  { to: '/today',    label: 'Today',    Icon: Dumbbell     },
  { to: '/planner',  label: 'Planner',  Icon: CalendarDays },
  { to: '/progress', label: 'Progress', Icon: BarChart2    },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-end"
      style={{
        maxWidth: 430,
        margin: '0 auto',
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
        width: '100%',
        background: 'rgba(20,20,30,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-3 px-6 transition-all duration-200 ${
              isActive ? 'text-accent' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              </span>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'text-accent' : 'text-gray-500'}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
