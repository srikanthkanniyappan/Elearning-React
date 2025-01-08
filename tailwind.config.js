import flowbitePlugin from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
          rotation: 'rotation 2s infinite',
          bouncing: 'bouncing 2s infinite',
          'bouncing-shadow': 'bouncing-shadow 2s infinite',
      },
      keyframes: {
          rotation: {
              '0%': {
                  transform: 'rotateX(45deg) rotateY(0) rotateZ(45deg)',
                  animationTimingFunction: 'cubic-bezier(0.17, 0.84, 0.44, 1)',
              },
              '50%': {
                  transform: 'rotateX(45deg) rotateY(0) rotateZ(225deg)',
                  animationTimingFunction: 'cubic-bezier(0.76, 0.05, 0.86, 0.06)',
              },
              '100%': {
                  transform: 'rotateX(45deg) rotateY(0) rotateZ(405deg)',
                  animationTimingFunction: 'cubic-bezier(0.17, 0.84, 0.44, 1)',
              },
          },
          bouncing: {
              '0%': {
                  transform: 'translateY(-40px)',
                  animationTimingFunction: 'cubic-bezier(0.76, 0.05, 0.86, 0.06)',
              },
              '45%': {
                  transform: 'translateY(40px)',
                  animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
              },
              '100%': {
                  transform: 'translateY(-40px)',
                  animationTimingFunction: 'cubic-bezier(0.76, 0.05, 0.86, 0.06)',
              },
          },
          'bouncing-shadow': {
              '0%': {
                  transform: 'translateZ(-80px) scale(1.3)',
                  animationTimingFunction: 'cubic-bezier(0.76, 0.05, 0.86, 0.06)',
                  opacity: '0.05',
              },
              '45%': {
                  transform: 'translateZ(0)',
                  animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  opacity: '0.3',
              },
              '100%': {
                  transform: 'translateZ(-80px) scale(1.3)',
                  animationTimingFunction: 'cubic-bezier(0.76, 0.05, 0.86, 0.06)',
                  opacity: '0.05',
              },
          },
      },
  },
  },
  plugins: [flowbitePlugin()],
};
