/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
  ],
    theme: {
      extend: {
        borderRadius :{
          'main_radius':'10px'
        },
        width:{
          '405':'405px',
          '63':'63%',
          '85':'86%',
        },
        padding:{
          '108':'108px',
          '104':'104px',
          '69':'69px'
        },
        margin:{
          '50':'5',
        }
        
      },
    },
    plugins: [],
}

