import fs from 'fs'
import path from 'path'

function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (match) {
      const frontmatter = {}
      const lines = match[1].split(/\r?\n/)
      
      lines.forEach(line => {
        const colonIndex = line.indexOf(':')
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim()
          const value = line.substring(colonIndex + 1).trim()
          
          const cleanValue = value.replace(/^['"]|['"]$/g, '')
          
          if (!isNaN(cleanValue) && cleanValue !== '') {
            frontmatter[key] = Number(cleanValue)
          } else {
            frontmatter[key] = cleanValue
          }
        }
      })
      
      return frontmatter
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e.message)
  }
  return {}
}

export function generateSidebar(dir, prefix = '') {
  if (!fs.existsSync(dir)) {
    return []
  }

  const items = []
  const files = fs.readdirSync(dir, { withFileTypes: true })

  const directories = []
  const markdownFiles = []

  files.forEach(file => {
    if (file.name.startsWith('.') || file.name.startsWith('_')) return

    if (file.isDirectory()) {
      directories.push(file)
    } else if (file.name.endsWith('.md')) {
      markdownFiles.push(file)
    }
  })

  markdownFiles.forEach(file => {
    const fullPath = path.join(dir, file.name)
    const relativePath = path.join(prefix, file.name)
    const name = file.name.replace('.md', '')
    const frontmatter = extractFrontmatter(fullPath)
    
    if (name === 'index') {
      items.push({
        text: frontmatter.title || '概览',
        link: prefix ? `/${prefix.replace(/\\/g, '/')}/` : '/',
        order: frontmatter.order !== undefined ? frontmatter.order : -1000
      })
    } else {
      const title = frontmatter.title || formatName(name)
      const order = frontmatter.order !== undefined ? frontmatter.order : extractOrderFromName(name)
      
      items.push({
        text: title,
        link: `/${relativePath.replace(/\\/g, '/').replace('.md', '')}`,
        order: order
      })
    }
  })

  items.sort((a, b) => {
    const orderA = a.order !== undefined ? a.order : 999
    const orderB = b.order !== undefined ? b.order : 999
    return orderA - orderB
  })

  items.forEach(item => delete item.order)

  const dirItems = []
  directories.forEach(file => {
    const fullPath = path.join(dir, file.name)
    const relativePath = path.join(prefix, file.name)
    
    const subItems = generateSidebar(fullPath, relativePath)
    if (subItems.length > 0) {
      const indexPath = path.join(fullPath, 'index.md')
      let dirTitle = formatName(file.name)
      let dirOrder = extractOrderFromName(file.name)
      
      if (fs.existsSync(indexPath)) {
        const frontmatter = extractFrontmatter(indexPath)
        if (frontmatter.title) dirTitle = frontmatter.title
        if (frontmatter.order !== undefined) dirOrder = frontmatter.order
      }
      
      dirItems.push({
        text: dirTitle,
        collapsed: false,
        items: subItems,
        order: dirOrder
      })
    }
  })

  dirItems.sort((a, b) => {
    const orderA = a.order !== undefined ? a.order : 999
    const orderB = b.order !== undefined ? b.order : 999
    return orderA - orderB
  })

  dirItems.forEach(item => delete item.order)

  return [...items, ...dirItems]
}

function extractOrderFromName(name) {
  const match = name.match(/^(\d+)[.-]/)
  return match ? parseInt(match[1]) : 999
}

function formatName(name) {
  const cleanName = name.replace(/^\d+[.-]/, '')
  
  return cleanName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function generateMultipleSidebars(configs) {
  const sidebars = {}
  
  configs.forEach(({ path: dirPath, prefix }) => {
    const fullPath = path.resolve(process.cwd(), dirPath)
    if (fs.existsSync(fullPath)) {
      sidebars[prefix] = generateSidebar(fullPath, prefix.slice(1))
    }
  })
  
  return sidebars
}
