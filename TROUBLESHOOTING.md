# Troubleshooting Guide

## ✅ **Fixed Issues**

### PostCSS/Tailwind CSS Error
**Error**: `[plugin:vite:css] [postcss] It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin`

**Solution**: ✅ **RESOLVED**
- Downgraded from Tailwind CSS v4 to v3.4.17 (stable version)
- Updated PostCSS configuration to use standard `tailwindcss` plugin
- Updated CSS imports to use standard Tailwind directives

## 🚀 **Current Setup**

### Dependencies
- **React**: 19.1.0
- **Vite**: 7.0.4
- **Tailwind CSS**: 3.4.17 (stable)
- **Framer Motion**: 12.23.9
- **Lucide React**: 0.525.0

### Configuration Files
- `postcss.config.js`: Uses standard `tailwindcss` plugin
- `tailwind.config.js`: Standard v3 configuration with custom colors
- `src/index.css`: Standard Tailwind directives (`@tailwind base`, etc.)

## 🔧 **Common Issues & Solutions**

### 1. **Port Already in Use**
**Issue**: `Port 5173 is in use`
**Solution**: Vite automatically tries the next available port (5174, 5175, etc.)

### 2. **Styles Not Loading**
**Issue**: Tailwind styles not appearing
**Solution**: 
- Ensure `npm install` was run after dependency changes
- Check that `src/index.css` is imported in `src/main.jsx`
- Verify Tailwind config `content` paths are correct

### 3. **Animation Issues**
**Issue**: Framer Motion animations not working
**Solution**:
- Check that `framer-motion` is properly installed
- Ensure React version compatibility
- Verify `AnimatePresence` is wrapping animated components

### 4. **Build Errors**
**Issue**: Build fails with dependency errors
**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 5. **TypeScript Errors** (if using TypeScript)
**Issue**: Type errors with components
**Solution**:
- Install type definitions: `npm install -D @types/react @types/react-dom`
- Check that all imports have proper types

## 🛠️ **Development Commands**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🌐 **Browser Compatibility**

### Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Known Issues
- **Internet Explorer**: Not supported (uses modern ES6+ features)
- **Older mobile browsers**: May have limited animation support

## 📱 **Mobile Testing**

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Touch Issues
- Ensure terminal input is tappable on mobile
- Test keyboard appearance on mobile devices
- Verify scroll behavior on touch devices

## 🔍 **Debugging Tips**

### Console Errors
1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed resource loads
4. Check Elements tab for CSS issues

### Performance Issues
1. Use React DevTools Profiler
2. Check for memory leaks in animations
3. Monitor bundle size with `npm run build`

### Terminal Functionality
1. Test all commands individually
2. Verify command history navigation
3. Check auto-completion functionality
4. Test error handling for invalid commands

## 📦 **Deployment Issues**

### Build Errors
```bash
# Clear cache and rebuild
npm run build -- --force
```

### Static File Issues
- Ensure all assets are in `public/` directory
- Check that image paths are correct
- Verify font loading from Google Fonts

### Environment Variables
- Create `.env` file for environment-specific settings
- Use `VITE_` prefix for client-side variables

## 🆘 **Getting Help**

### Check These First
1. **Node.js Version**: Ensure you're using Node.js 16+
2. **npm Version**: Update to latest npm version
3. **Clear Cache**: `npm cache clean --force`
4. **Restart Dev Server**: Stop and restart `npm run dev`

### Error Logs
When reporting issues, include:
- Full error message from console
- Node.js and npm versions (`node -v`, `npm -v`)
- Operating system
- Browser and version
- Steps to reproduce the issue

## ✅ **Verification Checklist**

After setup, verify these work:
- [ ] Development server starts without errors
- [ ] Terminal interface loads properly
- [ ] All commands execute correctly
- [ ] Animations play smoothly
- [ ] Responsive design works on mobile
- [ ] Build process completes successfully
- [ ] Production preview works correctly

---

**Status**: ✅ **All major issues resolved - Terminal portfolio is fully functional!**