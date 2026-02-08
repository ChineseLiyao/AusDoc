import fs from 'fs'
import path from 'path'

function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // 支持 \r\n 和 \n 换行符
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (match) {
      const frontmatter = {}
      const lines = match[1].split(/\r?\n/)
      
      lines.forEach(line => {
        const colonIndex = line.indexOf(':')
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim()
          const value = line.substring(colonIndex + 1).trim()
          
          // 移除引号
          const cleanValue = value.replace(/^['"]|['"]$/g, '')
          
          // 尝试转换为数字
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

  files.forEach(file => {
    if (file.name.startsWith('.') || file.name.startsWith('_')) return

    const fullPath = path.join(dir, file.name)
    const relativePath = path.join(prefix, file.name)

    if (file.isDirectory()) {
      const subItems = generateSidebar(fullPath, relativePath)
      if (subItems.length > 0) {
        // 尝试读取目录的 index.md
        const indexPath = path.join(fullPath, 'index.md')
        let dirTitle = formatName(file.name)
        let dirOrder = extractOrderFromName(file.name)
        
        if (fs.existsSync(indexPath)) {
          const frontmatter = extractFrontmatter(indexPath)
          if (frontmatter.title) dirTitle = frontmatter.title
          if (frontmatter.order !== undefined) dirOrder = frontmatter.order
        }
        
        items.push({
          text: dirTitle,
          collapsed: false,
          items: subItems,
          order: dirOrder
        })
      }
    } else if (file.name.endsWith('.md')) {
      const name = file.name.replace('.md', '')
      const frontmatter = extractFrontmatter(fullPath)
      
      if (name === 'index') {
        items.unshift({
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
    }
  })

  items.sort((a, b) => {
    const orderA = a.order !== undefined ? a.order : 999
    const orderB = b.order !== undefined ? b.order : 999
    return orderA - orderB
  })

  items.forEach(item => delete item.order)

  return items
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
