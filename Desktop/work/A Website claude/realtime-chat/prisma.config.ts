import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  datasource: {
    url: "postgresql://neondb_owner:npg_VcHg3quCLz8D@ep-shy-mountain-a1hvtlp5.ap-southeast-1.aws.neon.tech/realtime-chat?sslmode=require"
  }
})