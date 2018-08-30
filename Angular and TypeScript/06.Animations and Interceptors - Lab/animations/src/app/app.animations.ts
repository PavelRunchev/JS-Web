import { 
  trigger,
  state,
  animate,
  transition,
  style,
  keyframes,
  group
 } from '@angular/animations';

const appAnimations =  [
  trigger('divState', [
    state('normal', style({
      backgroundColor: 'red',
      transform: 'translateX(0)'
    })),
    state('highlighted', style({
      backgroundColor: 'blue',
      transform: 'translateX(100px)'
    })),
    transition("normal <=> highlighted", animate(1000))
  ]),
  trigger('wildState', [
    state('normal', style({
      backgroundColor: 'red',
      transform: 'translateX(0) scale(1)'
    })),
    state('highlighted', style({
      backgroundColor: 'yellow',
      transform: 'translateX(100px) scale(1)'
    })),
    state('shrunken', style({
      backgroundColor: 'green',
      transform: 'translateX(0) scale(0.5)'
    })),
    transition("normal => highlighted", animate(500)),
    transition("highlighted => normal", animate(300)),
    transition('shrunken <=> *', [
      style({
        backgroundColor: 'orange'
      }),
      animate(2000, style({
        borderRadius: '50px'
      })),
      animate(2000)
    ])
  ]),
  trigger('list1', [
    transition("void => *", [
      style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
      animate(3000)
    ]),
    transition('* => void', [
      animate(3000, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ]),
  trigger('list2', [
    transition("void => *", [
      animate(2000, keyframes([
        style({
          transform: 'translateX(-100px)',
          opacity: 0
        }),
        style({
          transform: 'translateX(-50px)',
          opacity: 0.5
        }),
        style({
          transform: 'translateX(-20px)',
          opacity: 0.7
        }),
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      ]))
    ]),
    transition('* => void', [
      group([
        animate(4000, style({
          color: 'red'
        })),
        animate(2000, style({
          transform: 'translateX(100px)',
          opacity: 0
         }))
      ])
    ])
  ])
]

export { appAnimations }