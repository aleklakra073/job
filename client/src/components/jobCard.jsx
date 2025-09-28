

import React from 'react';
import './JobCard.css'; // We will create this CSS file next for styling

/**
 * JobCard is a reusable React component that displays the details of a single job.
 * It's a "presentational" component because its main role is to display data it receives.
 *
 * @param {object} props - The properties passed to the component.
 * @param {object} props.job - The job object containing details to display.
 *        This object should match the standardized format from our backend.
 *        { id, title, company, location, url }
 */
function JobCard({ job }) {
  // A good practice is to handle the case where the job prop might not be provided.
  // In this case, we render nothing by returning null.
  if (!job) {
    return null;
  }

  // We use object destructuring to extract the properties from the 'job' object.
  // This makes the code in our JSX below cleaner and easier to read.
  const { title, company, location, url } = job;

  return (
    // The main container for the job card. We assign it a class name 'job-card'
    // so we can apply specific styles to it from our JobCard.css file.
    <div className="job-card">
      {/* This div holds the main textual information about the job. */}
      <div className="job-card-content">
        <h3 className="job-title">{title}</h3>
        <p className="job-company">{company}</p>
        <p className="job-location">{location}</p>
      </div>

      {/* This div holds the action button, separating it from the content for layout purposes. */}
      <div className="job-card-actions">
        {/* We use an anchor 'a' tag to create a link to the original job posting.
            - href={url}: The link's destination comes from our job data.
            - target="_blank": This ensures the link opens in a new browser tab,
              which is good user experience (UX) as it doesn't navigate the user away from our site.
            - rel="noopener noreferrer": A crucial security best practice for links opening in a new tab.
              It prevents the new page from having access to the originating page's window object.
        */}
        <a href={url} target="_blank" rel="noopener noreferrer" className="view-job-button">
          View Job
        </a>
      </div>
    </div>
  );
}

// We export the JobCard component to make it available for use in other parts of our application,
// such as the upcoming JobList component.
export default JobCard;