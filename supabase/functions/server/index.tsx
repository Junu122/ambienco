import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// CORS configuration
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Logging
app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
)

// Initialize storage buckets
const initializeBuckets = async () => {
  try {
    const bucketName = 'make-52299eb6-products'
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName)
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false })
      console.log(`Created bucket: ${bucketName}`)
    }
  } catch (error) {
    console.error('Error initializing buckets:', error)
  }
}

// Initialize buckets on startup
initializeBuckets()

// Health check
app.get('/make-server-52299eb6/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ===== PRODUCT MANAGEMENT ENDPOINTS =====

// Get all products
app.get('/make-server-52299eb6/products', async (c) => {
  try {
    const products = await kv.getByPrefix('product:')
    return c.json({ success: true, data: products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return c.json({ success: false, error: 'Failed to fetch products' }, 500)
  }
})

// Get products by category
app.get('/make-server-52299eb6/products/:category', async (c) => {
  try {
    const category = c.req.param('category')
    const products = await kv.getByPrefix(`product:${category}:`)
    return c.json({ success: true, data: products })
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return c.json({ success: false, error: 'Failed to fetch products' }, 500)
  }
})

// Get single product
app.get('/make-server-52299eb6/product/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const product = await kv.get(`product:${id}`)
    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }
    return c.json({ success: true, data: product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return c.json({ success: false, error: 'Failed to fetch product' }, 500)
  }
})

// Create new product
app.post('/make-server-52299eb6/products', async (c) => {
  try {
    const formData = await c.req.formData()
    const productData = JSON.parse(formData.get('productData') as string)
    const imageFile = formData.get('image') as File
    
    let imageUrl = null
    
    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      const fileName = `${Date.now()}-${imageFile.name}`
      const bucketName = 'make-52299eb6-products'
      
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, imageFile)
      
      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        return c.json({ success: false, error: 'Failed to upload image' }, 500)
      }
      
      // Get signed URL for the uploaded image
      const { data: urlData } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fileName, 60 * 60 * 24 * 365) // 1 year expiry
      
      if (urlData) {
        imageUrl = urlData.signedUrl
      }
    }
    
    const product = {
      id: `${productData.category}-${Date.now()}`,
      ...productData,
      image: imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`product:${product.id}`, product)
    
    return c.json({ success: true, data: product })
  } catch (error) {
    console.error('Error creating product:', error)
    return c.json({ success: false, error: 'Failed to create product' }, 500)
  }
})

// Update product
app.put('/make-server-52299eb6/products/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const formData = await c.req.formData()
    const productData = JSON.parse(formData.get('productData') as string)
    const imageFile = formData.get('image') as File
    
    const existingProduct = await kv.get(`product:${id}`)
    if (!existingProduct) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }
    
    let imageUrl = existingProduct.image
    
    // Handle new image upload
    if (imageFile && imageFile.size > 0) {
      const fileName = `${Date.now()}-${imageFile.name}`
      const bucketName = 'make-52299eb6-products'
      
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, imageFile)
      
      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        return c.json({ success: false, error: 'Failed to upload image' }, 500)
      }
      
      // Get signed URL for the uploaded image
      const { data: urlData } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fileName, 60 * 60 * 24 * 365)
      
      if (urlData) {
        imageUrl = urlData.signedUrl
      }
    }
    
    const updatedProduct = {
      ...existingProduct,
      ...productData,
      image: imageUrl,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`product:${id}`, updatedProduct)
    
    return c.json({ success: true, data: updatedProduct })
  } catch (error) {
    console.error('Error updating product:', error)
    return c.json({ success: false, error: 'Failed to update product' }, 500)
  }
})

// Delete product
app.delete('/make-server-52299eb6/products/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const product = await kv.get(`product:${id}`)
    
    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }
    
    await kv.del(`product:${id}`)
    
    return c.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return c.json({ success: false, error: 'Failed to delete product' }, 500)
  }
})

// ===== AI CHAT ENDPOINTS =====

// Store chat conversation for analytics
app.post('/make-server-52299eb6/chat/conversation', async (c) => {
  try {
    const chatData = await c.req.json()
    
    const conversation = {
      id: `chat-${Date.now()}`,
      sessionId: chatData.sessionId || `session-${Date.now()}`,
      messages: chatData.messages || [],
      userInfo: chatData.userInfo || {},
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }
    
    await kv.set(`chat:${conversation.id}`, conversation)
    
    return c.json({ success: true, data: conversation })
  } catch (error) {
    console.error('Error storing chat conversation:', error)
    return c.json({ success: false, error: 'Failed to store conversation' }, 500)
  }
})

// Get chat analytics (admin only)
app.get('/make-server-52299eb6/chat/analytics', async (c) => {
  try {
    const conversations = await kv.getByPrefix('chat:')
    
    const analytics = {
      totalConversations: conversations.length,
      totalMessages: conversations.reduce((sum, conv) => sum + (conv.messages?.length || 0), 0),
      commonQuestions: extractCommonQuestions(conversations),
      dailyStats: generateDailyStats(conversations)
    }
    
    return c.json({ success: true, data: analytics })
  } catch (error) {
    console.error('Error fetching chat analytics:', error)
    return c.json({ success: false, error: 'Failed to fetch analytics' }, 500)
  }
})

// Helper function to extract common questions
function extractCommonQuestions(conversations: any[]) {
  const questions: { [key: string]: number } = {}
  
  conversations.forEach(conv => {
    conv.messages?.forEach((msg: any) => {
      if (msg.type === 'user' && msg.content) {
        const question = msg.content.toLowerCase()
        questions[question] = (questions[question] || 0) + 1
      }
    })
  })
  
  return Object.entries(questions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([question, count]) => ({ question, count }))
}

// Helper function to generate daily stats
function generateDailyStats(conversations: any[]) {
  const dailyStats: { [key: string]: number } = {}
  
  conversations.forEach(conv => {
    const date = new Date(conv.createdAt).toISOString().split('T')[0]
    dailyStats[date] = (dailyStats[date] || 0) + 1
  })
  
  return Object.entries(dailyStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }))
}

// ===== FORUM ENDPOINTS =====

// Get all forum posts
app.get('/make-server-52299eb6/forum/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('forum:post:')
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return c.json({ success: true, data: sortedPosts })
  } catch (error) {
    console.error('Error fetching forum posts:', error)
    return c.json({ success: false, error: 'Failed to fetch posts' }, 500)
  }
})

// Create forum post
app.post('/make-server-52299eb6/forum/posts', async (c) => {
  try {
    const postData = await c.req.json()
    
    const post = {
      id: `post-${Date.now()}`,
      ...postData,
      createdAt: new Date().toISOString(),
      replies: []
    }
    
    await kv.set(`forum:post:${post.id}`, post)
    
    return c.json({ success: true, data: post })
  } catch (error) {
    console.error('Error creating forum post:', error)
    return c.json({ success: false, error: 'Failed to create post' }, 500)
  }
})

// Add reply to forum post
app.post('/make-server-52299eb6/forum/posts/:id/replies', async (c) => {
  try {
    const postId = c.req.param('id')
    const replyData = await c.req.json()
    
    const post = await kv.get(`forum:post:${postId}`)
    if (!post) {
      return c.json({ success: false, error: 'Post not found' }, 404)
    }
    
    const reply = {
      id: `reply-${Date.now()}`,
      ...replyData,
      createdAt: new Date().toISOString()
    }
    
    post.replies.push(reply)
    await kv.set(`forum:post:${postId}`, post)
    
    return c.json({ success: true, data: reply })
  } catch (error) {
    console.error('Error adding reply:', error)
    return c.json({ success: false, error: 'Failed to add reply' }, 500)
  }
})

// ===== CONTACT FORM ENDPOINT =====

// Submit contact form
app.post('/make-server-52299eb6/contact', async (c) => {
  try {
    const contactData = await c.req.json()
    
    const contact = {
      id: `contact-${Date.now()}`,
      ...contactData,
      createdAt: new Date().toISOString(),
      status: 'new'
    }
    
    await kv.set(`contact:${contact.id}`, contact)
    
    return c.json({ success: true, message: 'Contact form submitted successfully' })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return c.json({ success: false, error: 'Failed to submit contact form' }, 500)
  }
})

// Submit product inquiry
app.post('/make-server-52299eb6/product-inquiry', async (c) => {
  try {
    const inquiryData = await c.req.json()
    
    const inquiry = {
      id: `inquiry-${Date.now()}`,
      ...inquiryData,
      createdAt: new Date().toISOString(),
      status: 'new'
    }
    
    await kv.set(`inquiry:${inquiry.id}`, inquiry)
    
    return c.json({ success: true, message: 'Inquiry submitted successfully', inquiryId: inquiry.id })
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return c.json({ success: false, error: 'Failed to submit inquiry' }, 500)
  }
})

// Get all contact submissions (admin only)
app.get('/make-server-52299eb6/contacts', async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact:')
    const sortedContacts = contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return c.json({ success: true, data: sortedContacts })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return c.json({ success: false, error: 'Failed to fetch contacts' }, 500)
  }
})

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ success: false, error: 'Internal server error' }, 500)
})

// 404 handler
app.notFound((c) => {
  return c.json({ success: false, error: 'Not found' }, 404)
})

Deno.serve(app.fetch)