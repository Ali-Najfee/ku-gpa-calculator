document.getElementById('nextBtn').addEventListener('click', function () {
    const subjectCount = document.getElementById('subjectCount').value;
    const subjectInputs = document.getElementById('subjectInputs');
    subjectInputs.innerHTML = ''; // Clear previous inputs

    for (let i = 1; i <= subjectCount; i++) {
        subjectInputs.innerHTML += `
            <label for="subject${i}">Subject ${i} Marks:</label>
            <input type="number" id="subject${i}" min="0" max="100" placeholder="Enter marks ${i}" required>
        `;
    }

    document.getElementById('marksForm').style.display = 'block';
});

document.getElementById('submitBtn').addEventListener('click', function () {
    const semester = document.getElementById("semester").value; // Get the semester value
    const subjectCount = document.getElementById('subjectCount').value;
    let obtainedMarks = 0;
    let totalMarks = subjectCount * 100;
    let gpaResults = '';

    for (let i = 1; i <= subjectCount; i++) {
        const marks = parseInt(document.getElementById(`subject${i}`).value);
        obtainedMarks += marks;

        // Calculate GPA and Grade
        let grade, gradePoint;
        if (marks >= 90) { grade = 'A+'; gradePoint = 4.0; }
        else if (marks >= 80) { grade = 'A'; gradePoint = 4.0; }
        else if (marks >= 70) { grade = 'B'; gradePoint = 3.0; }
        else if (marks >= 60) { grade = 'C'; gradePoint = 2.0; }
        else if (marks >= 50) { grade = 'D'; gradePoint = 1.0; }
        else { grade = 'F'; gradePoint = 0.0; }

        // Create a table row for each subject's results
        gpaResults += `
            <tr>
                <td>Subject ${i}</td>
                <td>${marks}</td>
                <td>${grade}</td>
                <td>${gradePoint.toFixed(2)}</td>
            </tr>
        `;
    }

    const overallGPA = (obtainedMarks / totalMarks) * 4.0; // Convert to GPA scale
    document.getElementById('gpaResults').innerHTML = gpaResults;
    document.getElementById("semesterDisplay").innerText = `${semester} Semester`; // Display semester
    document.getElementById('totalMarks').innerHTML = `Total Marks: ${obtainedMarks} / ${totalMarks}`;

    document.getElementById('overallGPA').innerHTML = `Overall GPA: ${overallGPA.toFixed(2)}`;
    document.getElementById('happiness').innerHTML = `Happiness Level: ${overallGPA >= 2.0 ? '😊' : '😢'}`;

    // Show the GPA section
    document.getElementById('gpa-section').style.display = 'block';
    document.getElementById('download-section').style.display = 'block';

    // Display the final GPA in the modal
    document.getElementById('finalGPAResult').innerHTML = `Your Overall GPA: ${overallGPA.toFixed(2)}`;

   
});


// Function to download the results as an image
document.getElementById('downloadImage').addEventListener('click', function () {
    const gpaSection = document.getElementById('gpa-section');
    html2canvas(gpaSection).then(canvas => {
        const link = document.createElement('a');
        link.download = 'gpa_results.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});