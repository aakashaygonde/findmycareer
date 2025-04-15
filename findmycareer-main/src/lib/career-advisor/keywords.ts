
// Keywords for better response matching
export const keywordCategories = {
  technology: ['coding', 'programming', 'computers', 'tech', 'software', 'hardware', 'development', 'apps', 'websites', 'data', 'IT', 'digital', 'internet', 'cyber', 'AI', 'artificial intelligence', 'machine learning', 'cloud'],
  creativeArts: ['art', 'design', 'creative', 'drawing', 'painting', 'music', 'writing', 'photography', 'film', 'video', 'animation', 'graphic', 'visual', 'content', 'media', 'performance', 'fashion', 'crafts', 'storytelling'],
  business: ['business', 'management', 'marketing', 'finance', 'accounting', 'sales', 'entrepreneurship', 'leadership', 'economics', 'strategy', 'consulting', 'operations', 'HR', 'human resources', 'retail', 'commerce', 'administration'],
  science: ['science', 'research', 'experiment', 'laboratory', 'biology', 'chemistry', 'physics', 'environment', 'analysis', 'data', 'engineering', 'materials', 'astronomy', 'earth', 'geology', 'neuroscience', 'biotechnology'],
  healthcare: ['health', 'medical', 'patient', 'care', 'nursing', 'therapy', 'doctor', 'medicine', 'clinical', 'wellness', 'hospital', 'rehabilitation', 'diagnosis', 'treatment', 'psychology', 'mental health', 'public health'],
  education: ['teaching', 'education', 'school', 'learning', 'students', 'curriculum', 'instruction', 'classroom', 'tutoring', 'training', 'academic', 'professor', 'teacher', 'college', 'university', 'children', 'development'],
  socialServices: ['social work', 'community', 'nonprofit', 'helping', 'counseling', 'advocacy', 'support', 'services', 'welfare', 'case management', 'outreach', 'intervention', 'vulnerable populations', 'social justice', 'human services']
};

// Function to identify category based on keywords
export function identifyCategory(text: string): string | null {
  text = text.toLowerCase();
  
  // Check for direct mentions of categories
  if (text.includes('technology') || text.includes('tech')) return 'technology';
  if (text.includes('creative') || text.includes('art')) return 'creativeArts';
  if (text.includes('business')) return 'business';
  if (text.includes('science')) return 'science';
  if (text.includes('healthcare') || text.includes('health care')) return 'healthcare';
  if (text.includes('education') || text.includes('teaching')) return 'education';
  if (text.includes('social') || text.includes('community')) return 'socialServices';
  
  // Check for keywords
  let maxMatches = 0;
  let bestCategory = null;
  
  for (const [category, keywords] of Object.entries(keywordCategories)) {
    let matches = 0;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        matches++;
      }
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }
  
  return maxMatches > 0 ? bestCategory : null;
}
