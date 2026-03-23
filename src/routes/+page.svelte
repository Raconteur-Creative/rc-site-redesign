<script>
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';
	
	let typingText = '';
	const words = ["advocacy", "agents", "comms", "campaigns", "strategy"];
	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	
	let roboContainer;
	let spacecraftContainer;
	let progressValue = 0;
	let currentYear = new Date().getFullYear();
	let meshGradient;
	let formSubmitted = false;
	let formError = false;
	let formLoading = false;
	
	async function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		
		formLoading = true;
		formError = false;
		
		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				body: formData
			});
			
			if (response.ok) {
				formSubmitted = true;
				form.reset();
			} else {
				formError = true;
			}
		} catch (error) {
			formError = true;
		} finally {
			formLoading = false;
		}
	}
	
	// Terminal typing animation
	let terminalLines = [];
	const terminalContent = [
		{ text: '> Initializing contact_intelligence...', class: 'text-primary mb-2 opacity-80', delay: 0 },
		{ text: '> Protocol: STAKEHOLDER_MAPPING_ALPHA', class: 'text-secondary mb-2', delay: 800 },
		{ text: '... Enriching contact database (247 records)', class: 'text-on-surface-variant mb-1', delay: 1600 },
		{ text: '... Matching legislators to priority issues', class: 'text-on-surface-variant mb-1', delay: 2400 },
		{ text: '... Flagging 14 high-value targets [READY]', class: 'text-primary mb-1', delay: 3200 },
		{ text: '... Drafting personalized outreach queue', class: 'text-on-surface-variant mb-4', delay: 4000 },
		{ text: '> Awaiting deployment', class: 'text-on-surface flex items-center', delay: 4800, cursor: true }
	];
	
	function typeTerminalLine(lineIndex) {
		if (lineIndex >= terminalContent.length) return;
		
		const line = terminalContent[lineIndex];
		let charIndex = 0;
		
		const typeChar = () => {
			if (charIndex <= line.text.length) {
				terminalLines[lineIndex] = line.text.substring(0, charIndex);
				charIndex++;
				setTimeout(typeChar, 30);
			} else {
				// Move to next line after a delay
				setTimeout(() => typeTerminalLine(lineIndex + 1), 200);
			}
		};
		
		setTimeout(typeChar, line.delay);
	}
	
	function type() {
		const currentWord = words[wordIndex];
		
		if (isDeleting) {
			typingText = currentWord.substring(0, charIndex - 1);
			charIndex--;
		} else {
			typingText = currentWord.substring(0, charIndex + 1);
			charIndex++;
		}

		let typeSpeed = isDeleting ? 50 : 150;

		if (!isDeleting && charIndex === currentWord.length) {
			typeSpeed = 2000;
			isDeleting = true;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			typeSpeed = 500;
		}

		setTimeout(type, typeSpeed);
	}
	
	function animateProgress() {
		const duration = 2000;
		const startTime = Date.now();
		
		function update() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			progressValue = Math.floor(progress * 100);
			
			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}
		
		update();
	}
	
	onMount(() => {
		type();
		typeTerminalLine(0);
		
		// Load robot Lottie animation
		if (roboContainer) {
			lottie.loadAnimation({
				container: roboContainer,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: '/robo.json'
			});
		}
		
		// Load spacecraft Lottie animation
		if (spacecraftContainer) {
			lottie.loadAnimation({
				container: spacecraftContainer,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: '/spacecraft.json'
			});
		}
		
		// Progress animation now triggered on hover, not auto
		
		// Animate mesh gradient
		if (meshGradient) {
			let positions = [
				{ x1: 20, y1: 30, x2: 80, y2: 70, x3: 40, y3: 80, x4: 90, y4: 20 },
				{ x1: 70, y1: 60, x2: 30, y2: 20, x3: 80, y3: 40, x4: 10, y4: 70 },
				{ x1: 50, y1: 80, x2: 60, y2: 30, x3: 20, y3: 50, x4: 85, y4: 65 },
				{ x1: 30, y1: 40, x2: 75, y2: 75, x3: 55, y3: 25, x4: 15, y4: 85 }
			];
			let currentIndex = 0;
			
			function animateMesh() {
				const nextIndex = (currentIndex + 1) % positions.length;
				const current = positions[currentIndex];
				const next = positions[nextIndex];
				const duration = 8000;
				const startTime = Date.now();
				
				function updateGradient() {
					const elapsed = Date.now() - startTime;
					const progress = Math.min(elapsed / duration, 1);
					const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
					
					const x1 = current.x1 + (next.x1 - current.x1) * eased;
					const y1 = current.y1 + (next.y1 - current.y1) * eased;
					const x2 = current.x2 + (next.x2 - current.x2) * eased;
					const y2 = current.y2 + (next.y2 - current.y2) * eased;
					const x3 = current.x3 + (next.x3 - current.x3) * eased;
					const y3 = current.y3 + (next.y3 - current.y3) * eased;
					const x4 = current.x4 + (next.x4 - current.x4) * eased;
					const y4 = current.y4 + (next.y4 - current.y4) * eased;
					
					meshGradient.style.background = `
						radial-gradient(circle 400px at ${x1}% ${y1}%, rgba(173, 200, 245, 0.25), transparent),
						radial-gradient(circle 350px at ${x2}% ${y2}%, rgba(232, 101, 10, 0.2), transparent),
						radial-gradient(circle 300px at ${x3}% ${y3}%, rgba(255, 255, 255, 0.12), transparent),
						radial-gradient(circle 380px at ${x4}% ${y4}%, rgba(173, 200, 245, 0.18), transparent)
					`;
					
					if (progress < 1) {
						requestAnimationFrame(updateGradient);
					} else {
						currentIndex = nextIndex;
						setTimeout(animateMesh, 500);
					}
				}
				
				updateGradient();
			}
			
			animateMesh();
		}
	});
</script>

<svelte:head>
	<title>Raconteur Creative | Intelligent Advocacy & AI-Powered Communication</title>
	<meta name="description" content="We put the most advanced AI tools to work for your mission. Custom-built agents that amplify what your team can do, so your people can focus on what matters most." />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://raconteurcreative.com/" />
	<meta property="og:title" content="Raconteur Creative | Intelligent Advocacy & AI-Powered Communication" />
	<meta property="og:description" content="We put the most advanced AI tools to work for your mission. Custom-built agents that amplify what your team can do." />
	<meta property="og:image" content="https://raconteurcreative.com/og-image.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://raconteurcreative.com/" />
	<meta name="twitter:title" content="Raconteur Creative | Intelligent Advocacy & AI-Powered Communication" />
	<meta name="twitter:description" content="We put the most advanced AI tools to work for your mission. Custom-built agents that amplify what your team can do." />
	<meta name="twitter:image" content="https://raconteurcreative.com/og-image.jpg" />
	<meta name="twitter:site" content="@raconteurtweets" />
	<meta name="twitter:creator" content="@raconteurtweets" />
	
	<!-- Additional SEO -->
	<meta name="keywords" content="AI advocacy, custom AI agents, OpenClaw, intelligent communication, agentic workflows, government affairs, stakeholder mapping, DC advocacy, political communication" />
	<meta name="author" content="Raconteur Creative" />
	<link rel="canonical" href="https://raconteurcreative.com/" />
	
	<!-- Favicon -->
	<link rel="icon" type="image/svg+xml" href="/raconteur-logo.svg" />
	
	<!-- Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-2804PGN7Q9"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-2804PGN7Q9');
	</script>
	
	<!-- Structured Data -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Raconteur Creative",
			"url": "https://raconteurcreative.com",
			"logo": "https://raconteurcreative.com/raconteur-logo.svg",
			"description": "AI-powered advocacy and communication agency specializing in custom agentic workflows, intelligent stakeholder mapping, and automated communication systems.",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Washington",
				"addressRegion": "DC",
				"addressCountry": "US"
			},
			"email": "hello@raconteurcreative.com",
			"sameAs": [
				"https://twitter.com/raconteurtweets",
				"https://www.linkedin.com/company/raconteur-creative/",
				"https://www.facebook.com/raconteurcreative/"
			],
			"contactPoint": {
				"@type": "ContactPoint",
				"contactType": "customer service",
				"email": "hello@raconteurcreative.com"
			}
		}
	</script>
</svelte:head>

<div class="fixed inset-0 noise-bg z-[100]"></div>

<!-- Navigation -->
<nav class="fixed top-0 w-full z-50 bg-[#121416]/60 backdrop-blur-xl border-none" role="navigation" aria-label="Main navigation">
	<div class="flex justify-between items-center w-full px-8 py-6 max-w-full mx-auto">
		<div class="flex items-center">
			<a href="/" aria-label="Raconteur Creative Home">
				<img alt="Raconteur Creative Logo" class="h-10 w-auto" src="/raconteur-logo.svg" />
			</a>
		</div>
		<div class="hidden md:flex items-center gap-10">
			<a class="text-primary font-medium hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#services">Services</a>
			<a class="text-primary font-medium hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#agents">AI Agents</a>
			<a class="text-primary font-medium hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#faq">FAQs</a>
			<a class="bg-secondary text-on-secondary px-6 py-2 font-bold hover:opacity-90 transition-all text-xs uppercase tracking-tighter flex items-center gap-2" href="#contact">Contact <span class="material-symbols-outlined text-[14px] pulse-icon" aria-hidden="true">bolt</span></a>
		</div>
		<button class="md:hidden text-primary" aria-label="Open menu">
			<span class="material-symbols-outlined" aria-hidden="true">menu</span>
		</button>
	</div>
</nav>

<main role="main">
	<!-- Hero Section -->
	<section class="min-h-screen flex flex-col justify-center pt-24 px-8 md:px-20 relative overflow-hidden bg-surface">
		<div class="mesh-gradient" bind:this={meshGradient}></div>
		<div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-container/10 to-transparent z-0"></div>
		<div class="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
			<div class="md:col-span-7 z-10">
				<h1 class="font-headline text-6xl md:text-[8rem] leading-[0.85] tracking-tighter text-on-surface mb-8">
					Intelligent<br/>
					<span class="typing-container">
						<span id="typing-text">{typingText}</span>
					</span>
				</h1>
				<p class="font-body text-xl md:text-2xl text-on-surface-variant max-w-xl mb-12 font-light leading-relaxed">
					We put the most advanced AI tools to work for your mission. Custom-built agents that amplify what your team can do, so your people can focus on what matters most.
				</p>
				<div class="flex flex-wrap gap-4">
					<a href="#contact" class="bg-secondary text-on-secondary px-10 py-5 text-lg font-extrabold flex items-center gap-3 hover:gap-5 transition-all">
						Start a project <span class="material-symbols-outlined pulse-icon">arrow_forward</span>
					</a>
					<a href="#agents" class="bg-surface-container-high border border-outline-variant/30 text-primary px-10 py-5 text-lg font-bold hover:bg-primary/10 transition-colors">
						See AI services
					</a>
				</div>
			</div>
			<!-- Terminal Console -->
			<div class="md:col-span-5 relative group">
				<div class="bg-surface-container-lowest p-1 border border-outline-variant/20 shadow-2xl">
					<div class="bg-surface-container-high px-4 py-2 flex items-center gap-2 border-b border-outline-variant/10">
						<div class="flex gap-1.5">
							<div class="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
							<div class="w-2.5 h-2.5 rounded-full bg-secondary/40"></div>
							<div class="w-2.5 h-2.5 rounded-full bg-primary/40"></div>
						</div>
						<span class="text-[10px] font-label text-outline uppercase tracking-widest ml-4">agent_node_v4.0.1</span>
					</div>
					<div class="p-6 font-mono text-sm leading-relaxed min-h-[320px] bg-black/40">
						{#each terminalContent as line, i}
							{#if terminalLines[i] !== undefined}
								<div class={line.class}>
									{terminalLines[i]}{#if i === terminalContent.length - 1 && terminalLines[i] === line.text}<span class="terminal-cursor"></span>{/if}
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Client Strip -->
	<section class="py-12 bg-surface-container-lowest overflow-hidden">
		<div class="px-8 md:px-20 mb-6">
			<span class="font-label text-[10px] uppercase tracking-[0.3em] text-outline">Trusted by</span>
		</div>
		<div class="flex gap-16 items-center">
			<!-- First set of logos -->
			<div class="flex gap-16 items-center whitespace-nowrap animate-marquee">
				<svg class="h-10 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#amazon"></use></svg>
				<svg class="h-12 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#aga"></use></svg>
				<svg class="h-10 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#connected-commerce-council"></use></svg>
				<svg class="h-10 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#data-protocol"></use></svg>
				<svg class="h-12 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#glass-packaging-institute"></use></svg>
				<img src="/pabc-logo.svg" alt="Palmetto AgriBusiness Council" class="h-10 opacity-40 hover:opacity-70 transition-opacity cursor-default brightness-0 invert" />
				<svg class="h-12 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#punchbowl"></use></svg>
				<img src="/rainey-logo.svg" alt="The Rainey Center" class="h-12 opacity-40 hover:opacity-70 transition-opacity cursor-default brightness-0 invert" />
			</div>
			<!-- Duplicate set for seamless loop -->
			<div class="flex gap-16 items-center whitespace-nowrap animate-marquee" aria-hidden="true">
				<svg class="h-10 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#amazon"></use></svg>
				<svg class="h-12 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#aga"></use></svg>
				<svg class="h-10 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#connected-commerce-council"></use></svg>
				<svg class="h-10 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#data-protocol"></use></svg>
				<svg class="h-12 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#glass-packaging-institute"></use></svg>
				<img src="/pabc-logo.svg" alt="Palmetto AgriBusiness Council" class="h-10 opacity-40 hover:opacity-70 transition-opacity cursor-default brightness-0 invert" />
				<svg class="h-12 w-auto fill-white opacity-40 hover:opacity-70 transition-opacity cursor-default"><use href="/client-logos.svg#punchbowl"></use></svg>
				<img src="/rainey-logo.svg" alt="The Rainey Center" class="h-12 opacity-40 hover:opacity-70 transition-opacity cursor-default brightness-0 invert" />
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="py-32 px-8 md:px-20 bg-surface" id="services">
		<div class="max-w-7xl mx-auto">
			<div class="mb-20">
				<!-- Robot Lottie Animation -->
				<div class="mb-8 w-32 h-32" bind:this={roboContainer}></div>
				<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">Capabilities</span>
				<h2 class="font-headline text-5xl md:text-7xl leading-tight text-on-surface max-w-2xl">AI in Every Workflow</h2>
			</div>
			<div class="grid md:grid-cols-12 gap-8">
				<!-- Service Card: Web -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group relative">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary globe-hover transition-colors">language</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Web Design &amp; Development</h3>
					<p class="text-on-surface-variant font-light mb-8">Performance-first digital destinations optimized for visibility and technical authority.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
				<!-- Service Card: Advocacy -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary group-hover:animate-bounce transition-colors">campaign</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Advocacy Communications</h3>
					<p class="text-on-surface-variant font-light mb-8">Precision messaging designed to navigate complex regulatory and legislative landscapes.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
				<!-- Service Card: Anchor (Agentic) -->
				<div class="md:col-span-4 md:row-span-2 bg-primary-container p-12 flex flex-col justify-between border-l-4 border-secondary overflow-hidden" on:mouseenter={animateProgress}>
					<div>
						<div class="mb-8 text-secondary svg-nodes-links">
							<svg class="w-24 h-24" viewbox="0 0 100 100">
								<circle class="node" cx="50" cy="20" fill="currentColor" r="5"></circle>
								<circle class="node" cx="20" cy="50" fill="currentColor" r="5"></circle>
								<circle class="node" cx="80" cy="50" fill="currentColor" r="5"></circle>
								<circle class="node" cx="50" cy="80" fill="currentColor" r="5"></circle>
								<path class="link" d="M50 20 L20 50 L50 80 L80 50 Z" fill="none" stroke="currentColor" stroke-width="1"></path>
								<path class="link" d="M50 20 L50 80" fill="none" stroke="currentColor" stroke-width="1"></path>
								<path class="link" d="M20 50 L80 50" fill="none" stroke="currentColor" stroke-width="1"></path>
							</svg>
						</div>
						<span class="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-8 block">Just Released</span>
						<h3 class="font-headline text-4xl text-on-surface mb-6">Agentic Workflows</h3>
						<p class="text-on-surface-variant text-lg font-light leading-relaxed mb-8">Autonomous systems that manage communication, data synthesis, and stakeholder outreach while you sleep.</p>
					</div>
					<div class="space-y-4">
						<div class="h-1 bg-surface-dim/40 w-full"><div class="h-1 bg-secondary transition-all duration-2000" style="width: {progressValue}%"></div></div>
						<span class="font-mono text-[10px] text-primary uppercase">System efficiency: {progressValue}% optimized</span>
					</div>
				</div>
				<!-- Service Card: Graphic -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary pencil-hover transition-transform">draw</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Graphic Design</h3>
					<p class="text-on-surface-variant font-light mb-8">Visual identities that command respect through massive contrast and technical rigor.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
				<!-- Service Card: Audit -->
				<div class="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors group">
					<div class="flex justify-between items-start mb-12">
						<span class="material-symbols-outlined text-4xl text-secondary/30 group-hover:text-secondary checkmark-hover transition-transform">search_check</span>
						<span class="bg-primary/10 text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest">AI Enhanced</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Digital Audit</h3>
					<p class="text-on-surface-variant font-light mb-8">Deep-dive technical analysis of your current digital footprint and narrative reach.</p>
					<span class="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">arrow_right_alt</span>
				</div>
			</div>
		</div>
	</section>

	<!-- AI Agents Deep Dive -->
	<section class="py-32 px-8 md:px-20 bg-surface-container-lowest" id="agents">
		<div class="max-w-7xl mx-auto">
			<div class="mb-20 text-right flex flex-col items-end">
				<!-- Spacecraft Lottie Animation -->
				<div class="mb-8 w-40 h-40" bind:this={spacecraftContainer}></div>
				<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">Specialized Capability</span>
				<h2 class="font-headline text-5xl md:text-7xl leading-tight text-on-surface">AI Agent Design, Deployment, &amp; Management</h2>
			</div>
			<div class="grid md:grid-cols-3 gap-px bg-outline-variant/20 border border-outline-variant/20">
				<!-- Agent Architecture -->
				<div class="bg-surface p-12 group hover:bg-surface-container-low transition-all">
					<div class="w-12 h-12 border border-secondary/30 flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
						<span class="material-symbols-outlined">architecture</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Architecture</h3>
					<p class="text-on-surface-variant font-light mb-8">Designing the neural logic and data connectivity for specialized communication nodes.</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">v.1.0_Llama_3</span>
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Custom_RLHF</span>
					</div>
				</div>
				<!-- Agent Development -->
				<div class="bg-surface p-12 group hover:bg-surface-container-low transition-all">
					<div class="w-12 h-12 border border-secondary/30 flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
						<span class="material-symbols-outlined">code</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Development</h3>
					<p class="text-on-surface-variant font-light mb-8">Writing the custom Python and API integrations to bring autonomous logic into your tech stack.</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Active_Coding</span>
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">API_Mesh</span>
					</div>
				</div>
				<!-- Agent Management -->
				<div class="bg-surface p-12 group hover:bg-surface-container-low transition-all">
					<div class="w-12 h-12 border border-secondary/30 flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
						<span class="material-symbols-outlined">settings_suggest</span>
					</div>
					<h3 class="font-headline text-3xl text-on-surface mb-4">Management</h3>
					<p class="text-on-surface-variant font-light mb-8">Ongoing optimization, prompt tuning, and safety monitoring for deployed agents.</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Human_In_Loop</span>
						<span class="text-[9px] font-bold tracking-widest uppercase py-1 px-3 border border-outline-variant/30 text-outline">Drift_Alerts</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="py-32 px-8 md:px-20 bg-surface relative overflow-hidden">
		<div class="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-outline-variant/10"></div>
		<div class="max-w-7xl mx-auto relative z-10">
			<div class="text-center mb-20">
				<h2 class="font-headline text-4xl md:text-5xl text-on-surface">What our clients are saying</h2>
			</div>
			<div class="grid md:grid-cols-2 gap-24">
			<div class="border-l-2 border-secondary pl-12 flex flex-col gap-8">
				<p class="font-headline text-3xl md:text-4xl text-on-surface leading-tight">"Raconteur Creative has been the perfect creative partner. They work tirelessly to bring our vision to life, on time and on budget. Their ability to deliver technically sophisticated work without losing sight of our goals sets them apart."</p>
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 overflow-hidden">
						<img alt="David Forman" class="w-full h-full object-cover" src="/davidforman.jpg" />
					</div>
					<div>
						<span class="block font-bold text-primary uppercase tracking-widest text-sm">David Forman</span>
						<span class="text-outline text-xs uppercase tracking-widest">VP Research, American Gaming Association</span>
					</div>
				</div>
			</div>
			<div class="border-l-2 border-primary/30 pl-12 flex flex-col gap-8">
				<p class="font-headline text-3xl md:text-4xl text-on-surface leading-tight">"Working with Raconteur Creative has been a terrific experience. Patrick and his team are top-notch professionals who are talented, highly creative, and genuinely mission-driven. I would recommend them to anyone looking to elevate their marketing presence."</p>
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 overflow-hidden">
						<img alt="Rob Retzlaff" class="w-full h-full object-cover" src="/robretzlaff.jpg" />
					</div>
					<div>
						<span class="block font-bold text-primary uppercase tracking-widest text-sm">Rob Retzlaff</span>
						<span class="text-outline text-xs uppercase tracking-widest">Executive Director, Connected Commerce Council</span>
					</div>
				</div>
			</div>
		</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="py-32 px-8 md:px-20 bg-surface-container-low" id="faq">
		<div class="max-w-5xl mx-auto">
			<div class="mb-20">
				<div class="mb-10 w-20 h-20">
					<svg class="w-full h-full text-secondary" viewbox="0 0 100 100">
						<circle cx="50" cy="50" fill="none" opacity="0.2" r="40" stroke="currentColor" stroke-width="0.5"></circle>
						<circle cx="50" cy="50" fill="none" opacity="0.3" r="30" stroke="currentColor" stroke-width="0.5"></circle>
						<circle class="animate-pulse" cx="50" cy="50" fill="currentColor" opacity="0.8" r="15"></circle>
						<g class="animate-spin" style="transform-origin: 50% 50%; animation-duration: 10s">
							<circle cx="50" cy="10" fill="currentColor" r="3"></circle>
							<circle cx="90" cy="50" fill="currentColor" opacity="0.5" r="3"></circle>
							<circle cx="50" cy="90" fill="currentColor" opacity="0.5" r="3"></circle>
						</g>
					</svg>
				</div>
				<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">Common Queries</span>
				<h2 class="font-headline text-5xl text-on-surface">Intelligence &amp; Operations.</h2>
			</div>
			<div class="space-y-4">
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						What is OpenClaw?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">OpenClaw is our proprietary internal framework for orchestrating multi-agent systems. It allows us to build specialized intelligence nodes that work together without the hallucination risks typical of standard LLM deployments.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						Do you work with non-technical organizations?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Absolutely. Our role is to act as the technical bridge. We translate complex organizational goals into automated advocacy and communication workflows, regardless of your current technical maturity.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						What is the typical deployment timeline?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Standard digital projects move in 6-8 week sprints. Custom agentic architectures typically require a 12-week runway from initial discovery to live production management.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						How is this different from just using ChatGPT?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Off-the-shelf AI tools are general-purpose. Our agents are purpose-built for your organization, trained on your issues, connected to your data sources, and designed around your specific workflows. The difference is a Swiss Army knife versus a scalpel.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						Is our data safe?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Yes. We design agent architectures with data minimization principles built in. Your contacts, content, and organizational intelligence stay within systems you control. We never use client data to train shared models.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						Do we need to overhaul our existing tech stack?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Not typically. We build agents that connect to the tools you already use, including Airtable, Google Workspace, your CRM, and your website, rather than requiring a full platform migration.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						What does ongoing management look like after launch?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">We offer retainer-based management that includes prompt tuning, performance monitoring, drift alerts, and iterative improvements as your needs evolve. You're never handed a finished product and left alone with it.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						How does AI factor into your design and communications work?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Every service we offer is AI-enhanced, and we've developed deep expertise in how these tools perform at their limits. That translates to faster work, sharper output, and capabilities a traditional agency can't match at any price point. You get the benefit of that expertise without having to build it in-house.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						Do your non-agent services still make sense if we're not ready for AI?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Absolutely. Our web design, advocacy communications, and graphic design work stands on its own. And because we know these tools at a deeper level than most, even our traditional deliverables carry an edge your competitors won't have. Many clients start there and layer in agentic workflows as their comfort with AI grows.</p>
				</details>
				<details class="group bg-surface p-8 cursor-pointer border border-transparent hover:border-outline-variant/30 transition-all">
					<summary class="flex justify-between items-center font-bold text-lg text-on-surface list-none">
						Can you handle a full rebrand and an agent deployment at the same time?
						<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
					</summary>
					<p class="mt-6 text-on-surface-variant font-light leading-relaxed max-w-3xl">Yes, and there's a natural efficiency to it. When we're already inside your brand, your messaging, and your tech stack, building agents on top of that foundation is faster and more coherent. It also means the agents we deploy are informed by the same expertise driving your creative work, not bolted on afterward by someone who doesn't know your organization.</p>
				</details>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="py-32 px-8 md:px-20 bg-surface border-t border-outline-variant/10" id="contact">
		<div class="max-w-7xl mx-auto">
			<div class="grid md:grid-cols-2 gap-24">
				<div>
					<span class="font-label text-xs uppercase tracking-[0.4em] text-secondary mb-4 block">New Projects</span>
					<h2 class="font-headline text-5xl md:text-7xl leading-tight text-on-surface mb-12">Let's work together.</h2>
					<div class="space-y-10">
						<div class="flex items-start gap-6">
							<span class="material-symbols-outlined text-secondary mt-1">mail</span>
							<div>
								<span class="block text-xs uppercase font-bold tracking-widest text-outline mb-1">Direct Communication</span>
								<a class="text-2xl font-headline hover:text-primary transition-colors" href="mailto:hello@raconteurcreative.com">hello@raconteurcreative.com</a>
							</div>
						</div>
						<div class="flex items-start gap-6">
							<span class="material-symbols-outlined text-secondary mt-1">location_on</span>
							<div>
								<span class="block text-xs uppercase font-bold tracking-widest text-outline mb-1">HQ</span>
								<p class="text-xl font-light">Washington, DC</p>
							</div>
						</div>
					</div>
				</div>
				<form class="bg-surface-container-low p-10 md:p-16 space-y-8 border-l-4 border-secondary" on:submit={handleSubmit}>
					<input type="hidden" name="access_key" value="bfe5ad13-a1eb-4db6-a4a1-e138d349ee6c" />
					<input type="hidden" name="subject" value="New Contact Form Submission from Raconteur Creative" />
					<input type="hidden" name="from_name" value="Raconteur Creative Website" />
					<div class="grid md:grid-cols-2 gap-8">
						<div class="flex flex-col gap-2">
							<label class="text-[10px] uppercase font-bold tracking-widest text-outline">Full Name</label>
							<input name="name" class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface" placeholder="John Doe" type="text" required />
						</div>
						<div class="flex flex-col gap-2">
							<label class="text-[10px] uppercase font-bold tracking-widest text-outline">Organization</label>
							<input name="organization" class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface" placeholder="Inc." type="text" />
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-[10px] uppercase font-bold tracking-widest text-outline">Email Address</label>
						<input name="email" class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface" placeholder="john@example.com" type="email" required />
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-[10px] uppercase font-bold tracking-widest text-outline">How can we help?</label>
						<textarea name="message" class="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary transition-colors py-4 text-on-surface resize-none" placeholder="What's the project, and what's standing in your way?" rows="4" required></textarea>
					</div>
					{#if formSubmitted}
						<div class="w-full bg-primary/20 border border-primary/30 text-primary py-8 px-6 text-center">
							<span class="material-symbols-outlined text-5xl mb-4 block">check_circle</span>
							<p class="font-bold text-xl mb-2">Message Sent Successfully!</p>
							<p class="text-sm">We'll be in touch soon.</p>
						</div>
					{:else if formError}
						<div class="w-full bg-red-500/20 border border-red-500/30 text-red-400 py-8 px-6 text-center">
							<span class="material-symbols-outlined text-5xl mb-4 block">error</span>
							<p class="font-bold text-xl mb-2">Something went wrong</p>
							<p class="text-sm">Please email us directly at hello@raconteurcreative.com</p>
						</div>
					{:else}
						<button type="submit" disabled={formLoading} class="w-full bg-secondary text-on-secondary py-6 font-extrabold text-xl uppercase tracking-tighter hover:opacity-95 transition-opacity flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed">
							{#if formLoading}
								<span class="material-symbols-outlined animate-spin">progress_activity</span>
								Sending...
							{:else}
								Submit Inquiry <span class="material-symbols-outlined pulse-icon">send</span>
							{/if}
						</button>
					{/if}
				</form>
			</div>
		</div>
	</section>
</main>

<footer class="bg-surface-container-lowest border-t border-outline-variant/15">
	<div class="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full max-w-full mx-auto">
		<div class="flex flex-col md:flex-row items-center gap-8 mb-8 md:mb-0">
			<img alt="Raconteur" class="h-6 w-auto" src="/raconteur-logo.svg" />
			<span class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline">© {currentYear} Raconteur Creative</span>
		</div>
		<div class="flex gap-8">
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="https://www.linkedin.com/company/raconteur-creative/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="https://twitter.com/raconteurtweets" target="_blank" rel="noopener noreferrer">X / Twitter</a>
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="https://www.facebook.com/raconteurcreative/" target="_blank" rel="noopener noreferrer">Facebook</a>
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#faq">FAQs</a>
			<a class="font-inter text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="/privacy">Privacy</a>
		</div>
	</div>
</footer>

<style>
	:global(body) {
		font-family: 'Manrope', sans-serif;
		background-color: #121416;
		color: #e2e2e5;
		overflow-x: hidden;
	}
	:global(.font-serif-display) { font-family: 'DM Serif Display', serif; }
	:global(.font-inter) { font-family: 'Inter', sans-serif; }
	:global(.material-symbols-outlined) {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
		vertical-align: middle;
	}
	.terminal-cursor {
		display: inline-block;
		width: 8px;
		height: 18px;
		background-color: #E8650A;
		margin-left: 4px;
		animation: blink 1s step-end infinite;
	}
	@keyframes blink { 50% { opacity: 0; } }
	:global(.noise-bg) {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		opacity: 0.05;
		pointer-events: none;
	}
	
	/* Typing Headline Animation */
	.typing-container {
		display: inline-flex;
		align-items: center;
		background-color: #E8650A;
		color: #000000;
		padding: 0 0.164em; /* Reduced height by ~18%: 0.2 * 0.82 = 0.164 */
		transform: rotate(-1deg);
		white-space: nowrap;
	}
	#typing-text::after {
		content: '';
		display: inline-block;
		width: 0.1em;
		height: 1em;
		background-color: currentColor;
		margin-left: 2px;
		animation: blink 0.7s infinite;
	}

	/* SVG Animations */
	:global(.svg-technical-robot .head) { animation: head-float 4s ease-in-out infinite; }
	:global(.svg-technical-robot .eye) { animation: eye-blink 5s infinite; }
	:global(.svg-technical-robot .arm-r) { transform-origin: 30% 40%; animation: arm-wave 3s ease-in-out infinite; }
	@keyframes head-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
	@keyframes eye-blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0); } }
	@keyframes arm-wave { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }

	:global(.svg-nodes-links .node) { animation: node-pulse 3s ease-in-out infinite; }
	:global(.svg-nodes-links .link) { stroke-dasharray: 100; stroke-dashoffset: 100; animation: link-draw 6s linear infinite; }
	@keyframes node-pulse { 0%, 100% { r: 4; opacity: 0.5; } 50% { r: 6; opacity: 1; } }
	@keyframes link-draw { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }

	:global(.svg-spacecraft .flame) { animation: flame-flicker 0.1s infinite alternate; }
	:global(.svg-spacecraft .ship) { animation: ship-drift 4s ease-in-out infinite; }
	@keyframes flame-flicker { from { transform: scaleY(0.8); opacity: 0.7; } to { transform: scaleY(1.2); opacity: 1; } }
	@keyframes ship-drift { 0%, 100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(5px, -10px) rotate(2deg); } }

	/* Kinetic Icons */
	:global(.pulse-icon) { animation: icon-pulse 2s infinite; }
	@keyframes icon-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }

	/* Service Card Icon Animations */
	.globe-hover:hover {
		animation: globe-rotate 2s linear infinite;
	}
	@keyframes globe-rotate {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.group:hover .pencil-hover {
		animation: pencil-scribble 0.5s ease-in-out infinite;
	}
	@keyframes pencil-scribble {
		0%, 100% { transform: translate(0, 0) rotate(0deg); }
		25% { transform: translate(-2px, 2px) rotate(-5deg); }
		50% { transform: translate(2px, -2px) rotate(5deg); }
		75% { transform: translate(-2px, -2px) rotate(-3deg); }
	}

	.group:hover .checkmark-hover {
		animation: checkmark-draw 1.5s ease-in-out;
	}
	@keyframes checkmark-draw {
		0% { 
			opacity: 0;
			transform: scale(0) rotate(-45deg);
		}
		60% { 
			opacity: 1;
			transform: scale(1.1) rotate(0deg);
		}
		100% { 
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	/* Marquee Animation */
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
	:global(.animate-marquee) {
		display: flex;
		width: fit-content;
		animation: marquee 40s linear infinite;
	}
	:global(.animate-marquee:hover) {
		animation-play-state: paused;
	}

	/* Animated Mesh Gradient */
	.mesh-gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}
</style>
