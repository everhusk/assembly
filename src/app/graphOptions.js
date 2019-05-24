export const GROUP_INSTITUTIONS = 'institutions'
export const GROUP_MISSIONS = 'missions'
export const GROUP_PROJECTS = 'projects'

// noinspection JSUnusedGlobalSymbols
export default {
  layout: {
    randomSeed: 7,
    improvedLayout: true,
  },
  interaction: {
    selectConnectedEdges: true,
    hover: true,
  },
  nodes: {
    mass: 6,
    shape: 'dot',
    size: 40,
    borderWidth: 7,
    chosen: {
      node: (node, id, selected) => {
        node.color = 'rgba(126, 211, 33, 1)'
        if (selected) {
          node.shadow = true
        }
      },
    },
    shadow: {
      enabled: false,
      color: 'rgba(72, 89, 102, 0.5)',
      x: 0,
      y: 0,
      size: 28,
    },
    labelHighlightBold: false,
  },
  edges: {
    arrowStrikethrough: false,
    color: {
      color: 'rgba(126, 211, 33, 0.5)',
      highlight: 'rgba(126, 211, 33, 0.5)',
      hover: 'rgba(126, 211, 33, 0.5)',
    },
    arrows: {
      to: {
        enabled: false,
      },
    },
    chosen: {
      edge: (edge, id, selected) => {
        if (selected) {
          edge.shadow = true
        }
      },
    },
    shadow: {
      enabled: false,
      color: 'rgba(72, 89, 102, 0.5)',
      x: 0,
      y: 0,
      size: 28,
    },
    width: 1,
    selectionWidth: 5,
  },
  groups: {
    [GROUP_INSTITUTIONS]: {
      color: {
        border: '#FFFFFF',
        background: '#004EA8',
      },
      chosen: {
        node: (node, id, selected) => {
          if (selected) {
            node.shadow = true
            node.color = '#004EA8'
          }
        },
      },
      size: 50,
    },
    [GROUP_MISSIONS]: {
      color: {
        border: '#FFFFFF',
        background: '#cbf9bf',
      },
    },
    [GROUP_PROJECTS]: {
      shape: 'box',
      mass: 1,
      borderWidth: 0.5,
      color: {
        border: '#7ED321',
        background: '#fdfab2',
      },
      label: '   ',
      chosen: {
        node: (node, id, selected) => {
          if (selected) {
            node.shadow = true
          }
          node.color = 'rgba(248, 231, 28, 1)'
        },
      },
    },
  },
  physics: {
    maxVelocity: 1,
    timestep: 3,
    barnesHut: {
      avoidOverlap: 1,
    },
  },
}

export const basicNode = 'un'

export const initialGraph = {
  nodes: [
    { id: basicNode, group: GROUP_INSTITUTIONS, label: 'United Nations' },
  ],
  edges: [],
}

export const projectEdges = {
  color: {
    color: 'rgba(248, 231, 28, 1)',
    highlight: 'rgba(248, 231, 28, 1)',
    hover: 'rgba(248, 231, 28, 1)',
  },
  shadow: {
    color: 'rgba(72, 89, 102, 0.5)',
    x: 0,
    y: 0,
    size: 50,
  },
}

export const animation = {
  duration: 300,
  easingFunction: 'easeInOutQuad',
}
