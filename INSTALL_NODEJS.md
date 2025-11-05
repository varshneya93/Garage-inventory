# Installing Node.js on macOS

Since Node.js is not currently installed on your system, here's how to install it:

## 🎯 Recommended Method: Homebrew

Homebrew is the easiest way to install Node.js on macOS.

### Step 1: Install Homebrew

Open your **Terminal** and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the prompts. You may need to enter your password.

### Step 2: Install Node.js

After Homebrew is installed, run:

```bash
brew install node
```

### Step 3: Verify Installation

Check that Node.js and npm are installed:

```bash
node --version
npm --version
```

You should see version numbers like:
```
v20.x.x
10.x.x
```

### Step 4: Run Setup

Now you can set up the Portfolio Platform:

```bash
./setup.sh
```

---

## 🔄 Alternative Method 1: Official Installer

1. **Visit**: https://nodejs.org/
2. **Download**: Click the "LTS" (Long Term Support) button
3. **Install**: Open the downloaded `.pkg` file
4. **Follow**: The installation wizard
5. **Restart**: Your terminal
6. **Verify**: Run `node --version` and `npm --version`
7. **Setup**: Run `./setup.sh`

---

## 🛠️ Alternative Method 2: nvm (Node Version Manager)

nvm lets you install and switch between multiple Node.js versions.

### Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Restart your terminal, then:

```bash
# Install latest LTS version
nvm install --lts

# Use it
nvm use --lts

# Verify
node --version
npm --version
```

### Run Setup

```bash
./setup.sh
```

---

## ✅ After Node.js is Installed

Once Node.js is installed, you have two options:

### Option A: Automated Setup (Recommended)

```bash
./setup.sh
```

This script will:
- ✅ Verify Node.js installation
- ✅ Install all dependencies
- ✅ Set up environment variables
- ✅ Initialize database
- ✅ Seed sample data
- ✅ Run health checks

### Option B: Manual Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Initialize database
npm run db:generate
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

---

## 🚀 Starting the Server

After setup is complete:

```bash
npm run dev
```

Then open your browser to:
- **Public Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

---

## 🆘 Troubleshooting

### Homebrew Installation Issues

If Homebrew installation fails:
1. Check your internet connection
2. Make sure you have Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Try again

### Permission Errors

If you get permission errors:
```bash
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Node.js Not Found After Installation

1. Close and reopen your terminal
2. Check if Node.js is in your PATH:
   ```bash
   echo $PATH
   ```
3. If using Homebrew, run:
   ```bash
   brew doctor
   ```

### Still Having Issues?

1. Restart your computer
2. Try a different installation method
3. Check the official Node.js documentation: https://nodejs.org/

---

## 📚 What Happens Next?

Once Node.js is installed and you run `./setup.sh`:

1. ✅ All npm packages will be installed
2. ✅ Database will be created and seeded
3. ✅ Environment will be configured
4. ✅ System health check will run
5. ✅ You'll be ready to start the server!

Then you can:
- 🎨 Customize your portfolio
- 📝 Write blog posts
- 🖼️ Upload projects
- 🎯 Deploy to production

---

## 🎉 Summary

**Quick Steps:**
1. Install Node.js (using Homebrew, installer, or nvm)
2. Run `./setup.sh`
3. Run `npm run dev`
4. Open http://localhost:3000

**That's it!** Your Portfolio Platform will be up and running.

Need help? Check the documentation in the `docs/` folder.
