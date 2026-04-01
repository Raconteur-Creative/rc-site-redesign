<script>
	import { goto } from '$app/navigation';

	let formSubmitted = false;
	let formError = false;
	let formLoading = false;

	const adType = [
		'Digital Ad (150x600)',
		'Digital Ad (300x600)',
		'Email Banner (150x600)',
		'Email Banner (400x600)',
		'Letter 1/2 Pg Horizontal',
		'Letter 1/2 Pg Vertical',
		'Letter 1/4 Pg',
		'Letter Full Pg - 8.5" x 11"',
		'Standard Program A 1/2 Pg Horizontal',
		'Standard Program A 1/2 Pg Vertical',
		'Standard Program A 1/4 Pg',
		'Standard Program A 5.5" x 8.5"',
		'Standard Program B 1/4 Pg',
		'Standard Program B A5 1/2 Pg Horizontal',
		'Standard Program B A5 1/2 Pg Vertical',
		'Standard Program B A5 Full Pg',
		'Tabloid 1/2 Pg Horizontal',
		'Tabloid 1/2 Pg Vertical',
		'Tabloid 1/4 Pg',
		'Tabloid Full Pg 11" x 17"'
	];

	const pillar = [
		'Arts and Culture',
		'Education',
		'Equity and Social Justice',
		'General',
		'Health and Wellness',
		'Non-tech Upskilling and Workforce',
		'Small Business',
		'Sustainability',
		'Veterans and Military Families'
	];

	async function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		
		formLoading = true;
		formError = false;
		
		try {
			// Handle file uploads - convert to base64
			const fileInput = form.querySelector('input[type="file"]');
			if (fileInput && fileInput.files.length > 0) {
				// Remove the file input from formData
				formData.delete('attachments');
				
				// Convert files to base64 and add as separate fields
				for (let i = 0; i < fileInput.files.length; i++) {
					const file = fileInput.files[i];
					const base64 = await toBase64(file);
					formData.append(`attachment_${i + 1}`, base64);
					formData.append(`attachment_${i + 1}_name`, file.name);
				}
			}
			
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				body: formData
			});
			
			const result = await response.json();
			
			if (response.ok && result.success) {
				formSubmitted = true;
				form.reset();
			} else {
				console.error('Web3Forms error:', result);
				formError = true;
			}
		} catch (error) {
			console.error('Submit error:', error);
			formError = true;
		} finally {
			formLoading = false;
		}
	}

	function toBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}
</script>

<svelte:head>
	<title>Sponsorship Artwork Request | Raconteur Creative</title>
	<meta name="description" content="Request creative assets for approved sponsorships" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-surface py-12 px-8">
	<!-- Header -->
	<header class="max-w-3xl mx-auto mb-8">
		<a href="/" class="inline-block mb-6 hover:opacity-80 transition-opacity">
			<img src="/raconteur-logo.svg" alt="Raconteur Creative" class="h-10" />
		</a>
	</header>

	<!-- Form Container -->
	<div class="max-w-3xl mx-auto bg-surface-container p-8 md:p-12 border border-outline-variant/20">
		<h1 class="font-headline text-4xl md:text-5xl text-on-surface mb-4">Sponsorship Artwork Request</h1>
		
		{#if formSubmitted}
			<div class="py-12 text-center">
				<p class="text-on-surface text-xl mb-4">Thank you for your submission!</p>
				<p class="text-on-surface-variant mb-8">We'll be in touch soon.</p>
				<button 
					on:click={() => goto('/')}
					class="bg-secondary text-on-secondary px-6 py-3 font-bold hover:opacity-90 transition-all text-sm uppercase tracking-wider"
				>
					Return Home
				</button>
			</div>
		{:else}
			<p class="text-on-surface-variant mb-8">
				Please complete this form to request creative assets for sponsorships APPROVED BY the Amazon Community Engagement team.
			</p>

			{#if formError}
				<div class="bg-error/10 border border-error text-error px-4 py-3 mb-6">
					Error submitting form. Please try again.
				</div>
			{/if}

			<form on:submit={handleSubmit} class="space-y-6">
				<!-- Web3Forms Access Key (hidden) -->
				<input type="hidden" name="access_key" value="56da9fd5-4a0b-40e5-97ac-d6b83f1f5f3d" />
				<input type="hidden" name="subject" value="Sponsorship Artwork Request" />
				<input type="hidden" name="from_name" value="Sponsorship Form" />
				<input type="checkbox" name="botcheck" class="hidden" style="display: none;" />

				<!-- Event/Sponsorship Name -->
				<div>
					<label for="sponsorship" class="block text-on-surface font-bold mb-2">
						Event / Sponsorship Name <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Please provide the name of the sponsorship or sponsored event.
					</p>
					<input
						type="text"
						id="sponsorship"
						name="sponsorship"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- Name -->
				<div>
					<label for="name" class="block text-on-surface font-bold mb-2">
						Amazonian submitting this form <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						First and last name of the Amazon employee
					</p>
					<input
						type="text"
						id="name"
						name="name"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- Email -->
				<div>
					<label for="email" class="block text-on-surface font-bold mb-2">
						Contact Email <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Please list your Amazon email address (example: stephanie@amazon.com)
					</p>
					<input
						type="email"
						id="email"
						name="email"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- Ad Type -->
				<div>
					<label for="adtypes" class="block text-on-surface font-bold mb-2">
						Ad Type <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Select the artwork you're requesting (you may select multiple). If unsure, check:
						<a href="https://bit.ly/Amazon-Spec-Guide" target="_blank" rel="noreferrer" class="text-secondary underline hover:opacity-80">
							https://bit.ly/Amazon-Spec-Guide
						</a>
					</p>
					<select
						id="adtypes"
						name="adtypes"
						multiple
						required
						size="8"
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					>
						{#each adType as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
					<p class="text-on-surface-variant text-xs mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
				</div>

				<!-- Digital or Print -->
				<div>
					<label for="type" class="block text-on-surface font-bold mb-2">
						Digital or Print? <span class="text-error">*</span>
					</label>
					<select
						id="type"
						name="type"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					>
						<option value="" disabled selected>Select your answer</option>
						<option value="Digital">Digital</option>
						<option value="Print">Print</option>
						<option value="Both">Both</option>
					</select>
				</div>

				<!-- Design Specs -->
				<div>
					<label for="specs" class="block text-on-surface font-bold mb-2">
						Design Specs <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Provide design specifications from the organization. Ex: 5.5"x8.5" full page program ad, .25" bleed, full color; Horizontal/Vertical, etc.
					</p>
					<textarea
						id="specs"
						name="specs"
						required
						rows="4"
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					></textarea>
				</div>

				<!-- File Type -->
				<div>
					<label for="file" class="block text-on-surface font-bold mb-2">
						Which file type do you need? <span class="text-error">*</span>
					</label>
					<select
						id="file"
						name="file"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					>
						<option value="" disabled selected>Select your answer</option>
						<option value="JPEG">JPEG</option>
						<option value="PDF">PDF</option>
						<option value="PNG">PNG</option>
					</select>
				</div>

				<!-- Attachments -->
				<div>
					<label for="attachments" class="block text-on-surface font-bold mb-2">
						Attachments
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Provide materials like ad specs, design guidelines, etc. (File size limit 4MB). 
						Larger files may be emailed to <a href="mailto:patrick@raconteurcreative.com" class="text-secondary underline hover:opacity-80">patrick@raconteurcreative.com</a>
					</p>
					<input
						type="file"
						id="attachments"
						name="attachments"
						multiple
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-secondary file:text-on-secondary file:font-bold hover:file:opacity-90 focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- Organization -->
				<div>
					<label for="organization" class="block text-on-surface font-bold mb-2">
						Sponsored Organization <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Name of organization receiving the sponsorship
					</p>
					<input
						type="text"
						id="organization"
						name="organization"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- City -->
				<div>
					<label for="city" class="block text-on-surface font-bold mb-2">
						City Name <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Name of the city receiving the sponsorship
					</p>
					<input
						type="text"
						id="city"
						name="city"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- Website -->
				<div>
					<label for="website" class="block text-on-surface font-bold mb-2">
						Organization Website
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Website of the organization receiving the sponsorship
					</p>
					<input
						type="url"
						id="website"
						name="website"
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- Deadline -->
				<div>
					<label for="deadline" class="block text-on-surface font-bold mb-2">
						Submission Deadline <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Provide the organization's deadline to submit artwork and creative materials
					</p>
					<input
						type="date"
						id="deadline"
						name="deadline"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					/>
				</div>

				<!-- Pillar -->
				<div>
					<label for="pillar" class="block text-on-surface font-bold mb-2">
						Program Pillar <span class="text-error">*</span>
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Select the pillar category supported by the organization/event. The pillar selected corresponds to the artwork provided.
					</p>
					<select
						id="pillar"
						name="pillar"
						required
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					>
						<option value="" disabled selected>Select your answer</option>
						{#each pillar as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</div>

				<!-- Notes -->
				<div>
					<label for="notes" class="block text-on-surface font-bold mb-2">
						Notes / Considerations
					</label>
					<p class="text-on-surface-variant text-sm mb-2">
						Provide any additional notes the creative team should consider (ad sizes, design notes, etc.)
					</p>
					<textarea
						id="notes"
						name="notes"
						rows="4"
						class="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:border-secondary"
					></textarea>
				</div>

				<!-- Submit Button -->
				<div class="flex justify-center pt-4">
					<button
						type="submit"
						disabled={formLoading}
						class="bg-secondary text-on-secondary px-8 py-4 font-bold hover:opacity-90 transition-all text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{formLoading ? 'Submitting...' : 'Submit Request'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>
