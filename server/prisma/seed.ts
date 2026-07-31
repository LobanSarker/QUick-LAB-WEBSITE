import { PrismaPg } from "@prisma/adapter-pg";
import { BlogStatus, PrismaClient } from "../generated/prisma/client.js";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString:
      process.env.DATABASE_URL ??
      "postgresql://postgres:postgres@localhost:5432/quicklab?schema=public",
  }),
});

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@quicklab.org";
  const editorEmail = process.env.SEED_EDITOR_EMAIL ?? "editor@quicklab.org";

  const adminPassword = await bcrypt.hash(
    process.env.SEED_ADMIN_PASSWORD ?? "QuickAdmin@2026",
    10,
  );
  const editorPassword = await bcrypt.hash(
    process.env.SEED_EDITOR_PASSWORD ?? "QuickEditor@2026",
    10,
  );

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      name: "QuICK Admin",
      email: adminEmail,
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: editorEmail },
    update: {},
    create: {
      name: "Sumaiya Tabassum",
      email: editorEmail,
      password: editorPassword,
      role: "EDITOR",
    },
  });

  const researchAreas = [
    { name: "Supervised Quantum Computing", description: "Quantum algorithms and circuits for supervised machine learning tasks, including quantum kernel methods and variational classifiers.", image: "/assets/research/supervised-quantum-computing.jpg" },
    { name: "Deep Learning", description: "Artificial neural networks and deep learning architectures for large-scale, data-driven knowledge discovery.", image: "/assets/research/deep-learning.jpg" },
    { name: "Molecular Machine Learning", description: "Computational quantum chemistry and machine learning for molecular property prediction and drug discovery.", image: "/assets/research/molecular-ml.jpg" },
    { name: "Edge Computing", description: "Lightweight, collaborative and resource-efficient deep models for intelligent edge devices.", image: "/assets/research/edge-computing.jpg" },
    { name: "Industrial Informatics", description: "Intelligent computation for industrial systems, automation and manufacturing informatics.", image: "/assets/research/industrial-informatics.jpg" },
    { name: "Chemometrics", description: "Multivariate data analysis and machine learning applied to chemical measurement systems.", image: "/assets/research/chemometrics.jpg" },
    { name: "Mental Health Informatics", description: "Computational approaches for mental health assessment, monitoring and intervention.", image: "/assets/research/mental-health-informatics.jpg" },
    { name: "Computational Neuroscience", description: "Neural network models inspired by and applied to the study of the brain and cognition.", image: "/assets/research/computational-neuroscience.jpg" },
    { name: "Theoretical Quantum Machine Learning", description: "Foundations of quantum machine learning: theory, complexity and new quantum learning models.", image: "/assets/research/theoretical-qml.jpg" },
    { name: "Recommender System", description: "Personalized recommendation algorithms from collaborative filtering to deep and quantum-enhanced models.", image: "/assets/research/recommender-system.jpg" },
    { name: "Computer Vision", description: "Deep computer vision for classification, detection, segmentation and earth observation.", image: "/assets/research/computer-vision.jpg" },
  ];

  for (let i = 0; i < researchAreas.length; i++) {
    await prisma.researchArea.upsert({
      where: { name: researchAreas[i].name },
      update: { ...researchAreas[i], sortOrder: i },
      create: { ...researchAreas[i], sortOrder: i },
    });
  }

  const people = [
    { name: "Dr. Sumaiya Tabassum Nimi", institution: "North South University", role: "Director", profileUrl: "https://www.linkedin.com/in/sumaiya-tabassum-nimi-phd-8736977a/" },
    { name: "Dr. Md Adnan Arefeen", institution: "North South University", role: "Honorary Advisor", profileUrl: "https://www.linkedin.com/in/adnan-arefeen-3116b07a/" },
    { name: "Dr. M Sohel Rahman", institution: "Bangladesh University of Engineering and Technology", role: "Honorary Advisor", profileUrl: "https://www.linkedin.com/in/msrjoy/" },
    { name: "Sanjida Jannat Anannaya", institution: "United International University", role: "Research Assistant (CS)", profileUrl: "https://www.linkedin.com/in/sanjida-jannat-anannaya-074a721b2/" },
    { name: "Zuhair Zaki", institution: "Bangladesh University of Engineering and Technology, OpenRefactory inc.", role: "Graduate Research Assistant", profileUrl: "https://www.linkedin.com/in/s-m-zuhair-zaki-a11490265/" },
    { name: "Tawsif Shahriar Dipto", institution: "Bangladesh University of Engineering and Technology, BRAC University", role: "Graduate Research Assistant", profileUrl: "https://www.cse.sds.bracu.ac.bd/faculty_profile/18/md_tawsif_shahriar_dipto" },
    { name: "Oitijhya Hoque", institution: "Bangladesh University of Engineering and Technology", role: "Undergraduate Research Assistant", profileUrl: "https://www.linkedin.com/in/oitijhya-hoque-658283227/" },
    { name: "Md Tamim Iqbal", institution: "Bangladesh University of Engineering and Technology", role: "Undergraduate Research Assistant", profileUrl: "https://www.linkedin.com/in/mdtamimiqbal/" },
    { name: "Saif Ahmed", institution: "North South University", role: null, profileUrl: null },
    { name: "Md. Sabbir Ahmed, Sabir Hossain Hira, Argho Chanda Likhon, Md. Imran Hossain, Foysal Fahim", institution: "United International University", role: "FYDP Group", profileUrl: null },
    { name: "Sheikh Tanvir Ahmed", institution: "United International University", role: "Undergraduate Research Assistant", profileUrl: "https://www.linkedin.com/in/shkhtanvirahmed/" },
    { name: "Adiba Rahman Namira, Wafa Alam, Nafisa Mehzabeen", institution: "North South University", role: null, profileUrl: null },
    { name: "Jawata Afnan, Sanjana Afrin Tonny", institution: "North South University", role: null, profileUrl: null },
    { name: "Shahreen Sultana", institution: "North South University", role: "Graduate Research Assistant", profileUrl: null },
    { name: "Shahriar Sarkar", institution: "United International University", role: "Graduate Research Assistant", profileUrl: "https://www.linkedin.com/in/shahariarsarkar1503/" },
    { name: "Sadia Reza, Umme Zahara Simki", institution: "North South University", role: null, profileUrl: null },
  ];

  for (let i = 0; i < people.length; i++) {
    await prisma.person.upsert({
      where: { id: i + 1 },
      update: { ...people[i], sortOrder: i },
      create: { ...people[i], sortOrder: i },
    });
  }

  const papersFolder =
    "https://mailmissouri-my.sharepoint.com/:f:/g/personal/snvb8_umsystem_edu/EkPJqOYjRJVPgLMnKJLLRDoBbRASCxuFMz4qprB1e2KC_g?e=kfQpbN";

  const publications = [
    {
      title: "FactionFormer: Context-Driven Collaborative Vision Transformer Models for Edge Intelligence",
      venue: "IEEE SMARTCOMP 2023",
      year: 2023,
      authors: ["Nimi, S. T.", "Arefeen, A.", "Uddin, Y. S.", "Debnath, B.", "Chakradhar, S."],
      abstract: "A context-driven collaborative vision transformer framework that enables efficient edge intelligence through faction-based model partitioning and collaborative inference.",
      doi: null,
      link: papersFolder,
      image: "/assets/publications/factionformer.jpg",
    },
    {
      title: "Chimera: Context-Aware Splittable Deep Multitasking Models for Edge Intelligence",
      venue: "IEEE SMARTCOMP 2022",
      year: 2022,
      authors: ["Nimi, S. T.", "Arefeen, A.", "Uddin, Y. S.", "Debnath, B.", "Chakradhar, S."],
      abstract: "Chimera introduces context-aware splittable deep multitasking models that balance accuracy and resource usage for edge intelligence applications.",
      doi: null,
      link: papersFolder,
      image: "/assets/publications/chimera.png",
    },
    {
      title: "Deep Learning Model Composition for Edge Intelligence",
      venue: "IEEE SMARTCOMP 2022",
      year: 2022,
      authors: ["Nimi, S. T."],
      abstract: "A study of deep learning model composition strategies that enable multiple inference tasks to share computation efficiently on resource-constrained edge devices.",
      doi: null,
      link: papersFolder,
      image: "/assets/publications/dl-model-composition.png",
    },
    {
      title: "EARLIN: Early Out-of-Distribution Detection for Resource-Efficient Collaborative Inference",
      venue: "ECML-PKDD 2021",
      year: 2021,
      authors: ["Nimi, S. T.", "Arefeen, A.", "Uddin, Y. S.", "Lee, Y."],
      abstract: "EARLIN performs early out-of-distribution detection to make collaborative inference between edge devices and the cloud more resource-efficient.",
      doi: null,
      link: papersFolder,
      image: "/assets/publications/earlin.png",
    },
  ];

  for (const pub of publications) {
    await prisma.publication.upsert({
      where: { id: publications.indexOf(pub) + 1 },
      update: { ...pub, authorId: admin.id },
      create: { ...pub, authorId: admin.id },
    });
  }

  const blogs = [
    {
      title: "IEEE NSU SB Skill Development Venture 4.0",
      slug: "ieee-nsu-sb-skill-development-venture-4-0",
      excerpt:
        "Presentation, dataset and notebook resources from the IEEE NSU SB Skill Development Venture 4.0 session.",
      cover: "/assets/blog/ieee-venture.jpg",
      tags: ["Workshop", "Resources"],
      content: `We had a great session at the **IEEE NSU SB Skill Development Venture 4.0** on quantum machine learning. All the session resources are shared below for anyone who wants to dive deeper.

## Session Resources

- **Presentation**: [IEEE_NSU_SB.pptx](https://mailmissouri-my.sharepoint.com/:p:/g/personal/snvb8_umsystem_edu/ERBU-k2kqXxBvVvMk8FFEjUB5OI49R2ks7eZvMT1_LuoQQ?e=FPJRu8)
- **Dataset**: [Google Drive](https://drive.google.com/file/d/1AMMQ2hBYMhG7TkH-2r7RBOC3h33KEHw5/view?usp=sharing)
- **Notebook**: [Google Colab](https://colab.research.google.com/drive/1TfKaitZWDeSfTULQwXkiTC2f4vUaEBMl?usp=sharing)

Thank you to everyone who attended — stay tuned for more events from the QuICK research group!`,
      status: BlogStatus.PUBLISHED,
    },
    {
      title: "Uncovering the Best Resources for Quantum Deep Learning: Essential Tutorials, Blogs, and Books",
      slug: "essential-tutorials-blogs-and-books-to-learn-quantum-deep-learning",
      excerpt:
        "A curated list of tutorials, blogs, textbooks and codebases to get started with quantum deep learning.",
      cover: "/assets/blog/qdl-resources.webp",
      tags: ["Resources", "Quantum Deep Learning"],
      content: `Quantum deep learning sits at the intersection of quantum computing and neural networks. Here is my curated list of resources to learn it systematically.

## My Resources

- **LinkedIn Group**: [Quantum Deep Learning Community](https://www.linkedin.com/groups/14619021/)
- **Online Lecture Resources**: [Google Drive folder](https://drive.google.com/drive/folders/1BBSiUUG8Wv9sOUuTxsw85wxnWz_ZAErM?usp=sharing)

## Blogs

- [Quantum Deep Learning: A Quick Guide to Quantum Convolutional Neural Networks](https://medium.com/towards-data-science/quantum-deep-learning-a-quick-guide-to-quantum-convolutional-neural-networks-d65284e21fc4) — Towards Data Science

## Textbooks

- [Quantum Computation and Quantum Information](http://ndl.ethernet.edu.et/bitstream/123456789/73371/1/320.pdf) — Nielsen & Chuang
- [Quantum Computation and Quantum Information (PDF)](https://profmcruz.wordpress.com/wp-content/uploads/2017/08/quantum-computation-and-quantum-information-nielsen-chuang.pdf)

## Codebase

- [Hands-on Colab notebook](https://colab.research.google.com/drive/1hBrlPvLdz4-ais3mBNVrUCNFM0Zv9A6M?usp=sharing)

Happy learning!`,
      status: BlogStatus.PUBLISHED,
    },
    {
      title: "Latest Research Updates on Quantum Computing in Smart Tech",
      slug: "latest-research-updates-on-quantum-computing-in-smart-tech",
      excerpt:
        "Quantum computing is a cutting-edge field with tremendous potential for smart technologies. Here is a list of recent articles on quantum deep learning, especially hybrid quantum-classical deep neural networks.",
      cover: "/assets/blog/quantum-smart-tech.png",
      tags: ["Quantum Computing", "Research Updates"],
      content: `Quantum computing is a cutting-edge field that holds tremendous potential for revolutionizing smart technologies as we know them. In recent years, research in this area has been making significant strides towards unlocking the power of quantum computing in various applications.

Here is a list of recent articles on **Quantum Deep Learning**, especially on hybrid quantum-classical deep neural networks.

## Research Papers

1. Fan, F., Shi, Y., Guggemos, T., & Zhu, X. X. (2023). Hybrid quantum-classical convolutional neural network model for image classification. *IEEE Transactions on Neural Networks and Learning Systems*.
2. Caro, M. C., Huang, H.-Y., Ezzell, N. et al. Out-of-distribution generalization for learning quantum dynamics. *Nature Communications* 14, 3751 (2023). [doi.org/10.1038/s41467-023-39381-w](https://doi.org/10.1038/s41467-023-39381-w)
3. Hafeez, M. A., Munir, A., & Ullah, H. (2024). H-QNN: A Hybrid Quantum–Classical Neural Network for Improved Binary Image Classification. *AI*, 5(3), 1462–1481. [doi.org/10.3390/ai5030070](https://doi.org/10.3390/ai5030070)
4. Sinha, B. B., Sinha, R., & Priye, V. (2025). Beyond classical approaches: redefining the landscape of high-accurate movie recommendation using QNN. *The Journal of Supercomputing*, 81(1), 347.
5. Rishiwal, V., Agarwal, U., Yadav, M., Tanwar, S., Garg, D., & Guizani, M. (2025). A New Alliance of Machine Learning and Quantum Computing: Concepts, Attacks, and Challenges in IoT Networks. *IEEE Internet of Things Journal*.
6. Ruan, B., Liu, Z., & Li, X. A Novel Classical-Quantum Transfer Learning Framework for Image Recognition. Available at SSRN 4806924.
7. Çavşi Zaim, H., Yılmaz, M., & Yolaçan, E. N. (2024). Design of gender recognition system using quantum-based deep learning. *Neural Computing and Applications*, 36(4), 1997–2014.
8. Roh, E. J., Baek, H., Kim, D., & Kim, J. (2024). Fast quantum convolutional neural networks for low-complexity object detection in autonomous driving applications. *IEEE Transactions on Mobile Computing*.
9. Piperno, S., Lavagna, L., De Falco, F., Ceschini, A., Rosato, A., Windridge, D., & Panella, M. (2024). Quantum Enhanced Knowledge Distillation. In *Proceedings of Quantum Techniques in Machine Learning (QTML 2024)* (pp. 1–3).
10. Roh, E. J., Shim, J. Y., Kim, J., & Park, S. (2025). Hybrid quantum-classical 3D object detection using multi-channel quantum convolutional neural network. *The Journal of Supercomputing*, 81(3), 1–24.
11. Hasan, M. J., & Mahdy, M. R. C. (2023). Bridging Classical and Quantum Machine Learning: Knowledge Transfer From Classical to Quantum Neural Networks Using Knowledge Distillation. arXiv:2311.13810.
12. Reka, S. S., Karthikeyan, H. L., Shakil, A. J., Venugopal, P., & Muniraj, M. (2024). Exploring Quantum Machine Learning for Enhanced Skin Lesion Classification. *IEEE Access*, 12, 104568–104584. [doi: 10.1109/ACCESS.2024.3434681](https://doi.org/10.1109/ACCESS.2024.3434681)
13. Khatun, A., & Usman, M. (2025). Quantum Transfer Learning with Adversarial Robustness for Classification of High-Resolution Image Datasets. *Advanced Quantum Technologies*, 8, 2400268. [doi.org/10.1002/qute.202400268](https://doi.org/10.1002/qute.202400268)
14. Pan, H., Zhu, X., Atici, S. F., & Cetin, A. (2023, July). A hybrid quantum-classical approach based on the Hadamard transform for the convolutional layer. In *ICML* (pp. 26891–26903). PMLR.
15. Zaman, K., Ahmed, T., Kashif, M., Hanif, M. A., Marchisio, A., & Shafique, M. (2024). Studying the Impact of Quantum-Specific Hyperparameters on Hybrid Quantum-Classical Neural Networks. arXiv:2402.10605.
16. Moussa, C., Patel, Y. J., Dunjko, V., Bäck, T., & van Rijn, J. N. (2024). Hyperparameter importance and optimization of quantum neural networks across small datasets. *Machine Learning*, 113(4), 1941–1966.
17. Wang, A., Hu, J., Zhang, S., & Li, L. (2024). Shallow hybrid quantum-classical convolutional neural network model for image classification. *Quantum Information Processing*, 23(1), 17.
18. Ren, C., Yan, R., Zhu, H., Yu, H., Xu, M., Shen, Y., ... & Kwek, L. C. (2023). Towards quantum federated learning. arXiv:2306.09912.
19. Zhu, Y., Bouridane, A., Celebi, M. E., Konar, D., Angelov, P., Ni, Q., & Jiang, R. (2024). Quantum face recognition with multi-gate quantum convolutional neural network. *IEEE Transactions on Artificial Intelligence*.
20. Fan, F., Shi, Y., & Zhu, X. X. (2024). Land Cover Classification From Sentinel-2 Images With Quantum-Classical Convolutional Neural Networks. *IEEE JSTARS*.
21. Fan, F., Shi, Y., Guggemos, T., & Zhu, X. X. (2025). Hybrid Quantum Deep Learning With Superpixel Encoding for Earth Observation Data Classification. *IEEE Transactions on Neural Networks and Learning Systems*.
22. Oviesi, S., & Tarokh, M. J. (2025). Quantum neural network-assisted learning for small medical datasets: a case study in emphysema detection. *The Journal of Supercomputing*, 81(1), 1–32.
23. Guha, D., Mitra, S., Kuiry, S., & Das, N. (2024). An ensemble framework approach of hybrid Quantum convolutional neural networks for classification of breast cancer images. arXiv:2409.15958.
24. Sünkel, L., Altmann, P., Köle, M., & Gabor, T. (2024, September). On the Quantum Impact in Hybrid Classical-Quantum Transfer Learning. In *IEEE QCE* (Vol. 2, pp. 11–15).
25. Egginger, S., Sakhnenko, A., & Lorenz, J. M. (2024). A hyperparameter study for quantum kernel methods. *Quantum Machine Intelligence*, 6(2), 44.
26. Senokosov, A., Sedykh, A., Sagingalieva, A., Kyriacou, B., & Melnikov, A. (2024). Quantum machine learning for image classification. *Machine Learning: Science and Technology*, 5(1), 015040.
27. Baker, J. S., Park, G., Yu, K., Ghukasyan, A., Goktas, O., & Radha, S. K. (2024). Parallel hybrid quantum-classical machine learning for kernelized time-series classification. *Quantum Machine Intelligence*, 6(1), 18.
28. Domingo, L., Chehimi, M., Banerjee, S., et al. (2024, September). A hybrid quantum-classical fusion neural network to improve protein-ligand binding affinity predictions for drug discovery. In *IEEE QCE* (Vol. 2, pp. 126–131).
29. Bowles, J., Ahmed, S., & Schuld, M. (2024). Better than classical? The subtle art of benchmarking quantum machine learning models. arXiv:2403.07059.
30. Phukan, A., Pal, S., & Ekbal, A. (2024). Hybrid Quantum-Classical Neural Network for Multimodal Multitask Sarcasm, Emotion, and Sentiment Analysis. *IEEE Transactions on Computational Social Systems*.`,
      status: BlogStatus.PUBLISHED,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: { ...blog, authorId: editor.id },
      create: { ...blog, authorId: editor.id },
    });
  }

  console.log("Seed complete");
  console.log(`- Users: ${admin.email} (ADMIN), ${editor.email} (EDITOR)`);
  console.log(`- Research areas: ${researchAreas.length}`);
  console.log(`- People: ${people.length}`);
  console.log(`- Publications: ${publications.length}`);
  console.log(`- Blogs: ${blogs.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
