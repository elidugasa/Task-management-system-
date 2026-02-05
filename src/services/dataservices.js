// src/services/dataService.js
// Import data from files
import { teamMembers as initialTeamMembers } from '../data/teamMember.js';
import { teams as initialTeams } from '../data/teams.js';
import { projects as initialProjects } from '../data/project.js';
import { tasks as initialTasks } from '../data/task.js';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// LocalStorage wrapper for backward compatibility
class DataService {
  // Team Members
  static getTeamMembers() {
    if (!isBrowser) return initialTeamMembers;
    
    try {
      const saved = localStorage.getItem('teamMembers');
      return saved ? JSON.parse(saved) : initialTeamMembers;
    } catch (error) {
      console.error('Error loading team members:', error);
      return initialTeamMembers;
    }
  }

  static saveTeamMembers(members) {
    if (!isBrowser) return;
    
    try {
      localStorage.setItem('teamMembers', JSON.stringify(members));
    } catch (error) {
      console.error('Error saving team members:', error);
    }
  }

  // Teams
  static getTeams() {
    if (!isBrowser) return initialTeams;
    
    try {
      const saved = localStorage.getItem('teams');
      return saved ? JSON.parse(saved) : initialTeams;
    } catch (error) {
      console.error('Error loading teams:', error);
      return initialTeams;
    }
  }

  static saveTeams(teamsData) {
    if (!isBrowser) return;
    
    try {
      localStorage.setItem('teams', JSON.stringify(teamsData));
    } catch (error) {
      console.error('Error saving teams:', error);
    }
  }

  // Projects
  static getProjects() {
    if (!isBrowser) return initialProjects;
    
    try {
      const saved = localStorage.getItem('managerProjects');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch (error) {
      console.error('Error loading projects:', error);
      return initialProjects;
    }
  }

  static saveProjects(projectsData) {
    if (!isBrowser) return;
    
    try {
      localStorage.setItem('managerProjects', JSON.stringify(projectsData));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }

  // Tasks
  static getTasks() {
    if (!isBrowser) return initialTasks;
    
    try {
      const saved = localStorage.getItem('managerTasks');
      return saved ? JSON.parse(saved) : initialTasks;
    } catch (error) {
      console.error('Error loading tasks:', error);
      return initialTasks;
    }
  }

  static saveTasks(tasksData) {
    if (!isBrowser) return;
    
    try {
      localStorage.setItem('managerTasks', JSON.stringify(tasksData));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  // Combined operations
  static getProjectWithTeam(projectId) {
    const project = this.getProjects().find(p => p.id === projectId);
    if (!project) return null;
    
    const team = this.getTeams().find(t => t.id === project.teamId);
    return {
      ...project,
      teamDetails: team
    };
  }

  static getTeamMembersForProject(projectId) {
    const project = this.getProjects().find(p => p.id === projectId);
    if (!project || !project.teamMembers) return [];
    
    const allMembers = this.getTeamMembers();
    return allMembers.filter(member => 
      project.teamMembers.includes(member.id)
    );
  }

  static createProjectWithTeam(projectData, teamId) {
    const team = this.getTeams().find(t => t.id === teamId);
    if (!team) throw new Error('Team not found');
    
    const newProject = {
      id: Date.now(),
      ...projectData,
      teamId,
      teamName: team.name,
      teamMembers: team.members,
      progress: 0,
      status: 'active',
      tasks: {
        total: 0,
        completed: 0,
        pending: 0,
        overdue: 0
      },
      spent: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    const projects = this.getProjects();
    projects.push(newProject);
    this.saveProjects(projects);
    
    return newProject;
  }

  static createTaskForProject(taskData, projectId) {
    const project = this.getProjects().find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');
    
    // Find assignee details
    const assignee = this.getTeamMembers().find(m => m.id === taskData.assigneeId);
    if (!assignee) throw new Error('Assignee not found');
    
    const newTask = {
      id: Date.now(),
      ...taskData,
      projectId,
      projectName: project.name,
      assignee: assignee.name,
      teamId: project.teamId,
      teamName: project.teamName,
      progress: 0,
      status: 'pending',
      actualHours: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: taskData.tags || []
    };
    
    const tasks = this.getTasks();
    tasks.push(newTask);
    this.saveTasks(tasks);
    
    // Update project task count
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      projects[projectIndex] = {
        ...projects[projectIndex],
        tasks: {
          ...(projects[projectIndex].tasks || { total: 0, completed: 0, pending: 0, overdue: 0 }),
          total: (projects[projectIndex].tasks?.total || 0) + 1,
          pending: (projects[projectIndex].tasks?.pending || 0) + 1
        },
        updatedAt: new Date().toISOString().split('T')[0]
      };
      this.saveProjects(projects);
    }
    
    return newTask;
  }

  static updateTaskProgress(taskId, progress) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) throw new Error('Task not found');
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      progress,
      status: progress === 100 ? 'completed' : 'in-progress',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    this.saveTasks(tasks);
    return tasks[taskIndex];
  }

  static deleteTask(taskId) {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    this.saveTasks(updatedTasks);
    
    // Update project task count
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(p => p.id === task.projectId);
    if (projectIndex !== -1) {
      projects[projectIndex] = {
        ...projects[projectIndex],
        tasks: {
          ...(projects[projectIndex].tasks || { total: 0, completed: 0, pending: 0, overdue: 0 }),
          total: Math.max((projects[projectIndex].tasks?.total || 0) - 1, 0),
          pending: Math.max((projects[projectIndex].tasks?.pending || 0) - 1, 0)
        },
        updatedAt: new Date().toISOString().split('T')[0]
      };
      this.saveProjects(projects);
    }
    
    return true;
  }

  static deleteProject(projectId) {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');
    
    const updatedProjects = projects.filter(p => p.id !== projectId);
    this.saveProjects(updatedProjects);
    
    // Delete associated tasks
    const tasks = this.getTasks();
    const updatedTasks = tasks.filter(t => t.projectId !== projectId);
    this.saveTasks(updatedTasks);
    
    return true;
  }

  static initializeData() {
    if (!isBrowser) return;
    
    // Initialize data in localStorage if not present
    if (!localStorage.getItem('teamMembers')) {
      this.saveTeamMembers(initialTeamMembers);
    }
    
    if (!localStorage.getItem('teams')) {
      this.saveTeams(initialTeams);
    }
    
    if (!localStorage.getItem('managerProjects')) {
      this.saveProjects(initialProjects);
    }
    
    if (!localStorage.getItem('managerTasks')) {
      this.saveTasks(initialTasks);
    }
  }
}

// Initialize data on import
if (isBrowser) {
  DataService.initializeData();
}

export default DataService;